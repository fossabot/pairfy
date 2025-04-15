import { Request, Response, NextFunction } from "express";
import { ApiError, ERROR_CODES } from "@pairfy/common";
import { verifyToken } from "./token";
import logger from "./logger";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_RATE_LIMIT as string);

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 20;

//change to distributed rate-limit
const fallbackStore = new Map<string, { count: number; expiresAt: number }>();

export const rateLimiter = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  let key = "";

  try {
    if (!req.publicAddress) {
      throw new ApiError(500, "Internal Error", {
        code: ERROR_CODES.INTERNAL_ERROR,
      });
    }

    key = `ratelimit:ip:${req.publicAddress}`;

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    const token = req.session?.jwt;

    if (token) {
      try {
        const decoded = verifyToken(token, process.env.AGENT_JWT_KEY!) as {
          sub?: string;
        };

        if (decoded?.sub) {
          key = `ratelimit:user:${decoded.sub}`;
        }
      } catch {}
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    const saveInRedis = await redis.set(key, 1, "EX", WINDOW_SECONDS, "NX");

    if (!saveInRedis) {
      const current = await redis.incr(key);

      if (current > MAX_REQUESTS) {
        logger.warn(`RateLimitExceeded: key=${key}`);

        throw new ApiError(429, "Too many requests", {
          code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
        });
      }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    next();
  } catch (err) {
    if (!(err instanceof ApiError)) {
      logger.error("Redis error, using fallback store:", err);
    }

    const now = Date.now();

    const data = fallbackStore.get(key);

    const isKeyInvalid = !data || data.expiresAt < now;

    if (isKeyInvalid) {
      fallbackStore.set(key, {
        count: 1,
        expiresAt: now + WINDOW_SECONDS * 1000,
      });
    }

    if (!isKeyInvalid) {
      data.count += 1;

      if (data.count > MAX_REQUESTS) {
        logger.warn(`Rate limit exceeded (fallback): key=${key}`);

        return next(
          new ApiError(429, "Too many requests", {
            code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
          })
        );
      }
    }

    next(err);
  }
};
