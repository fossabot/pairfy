import Redis from "ioredis";
import { Request, Response, NextFunction } from "express";
import { ApiError, ERROR_CODES, logger } from "./index";
import { verifyToken } from "./token";

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 20;

export class RateLimiter {
  private redis: Redis;
  private fallbackStore: Map<string, { count: number; expiresAt: number }>;

  constructor(redisUrl: string) {
    this.redis = new Redis(redisUrl, {
      retryStrategy(times) {
        if (times > 20) return null;
        return Math.min(times * 100, 2000);
      },
    });

    this.redis.on("error", (err) => {
      logger.error("[RedisClientError]", err);
    });

    this.redis.on("connect", () => {
      logger.info("[RedisClientConnected]");
    });

    this.fallbackStore = new Map();
  }

  getMiddleware() {
    return async (
      req: Request,
      res: Response,
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

        const token = req.session?.jwt;

        if (token) {
          try {
            const decoded = verifyToken(token, process.env.AGENT_JWT_KEY!) as {
              sub?: string;
            };
            if (decoded?.sub) {
              key = `ratelimit:user:${decoded.sub}`;
            }
          } catch {
            // IP
          }
        }

        const saved = await this.redis.set(key, 1, "EX", WINDOW_SECONDS, "NX");

        if (!saved) {
          const current = await this.redis.incr(key);

          if (current > MAX_REQUESTS) {
            logger.warn(`[RateLimitExceeded]: key=${key}`);
            throw new ApiError(429, "Too many requests", {
              code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
            });
          }
        }

        return next();
      } catch (err) {
        if (err instanceof ApiError) {
          return next(err);
        }

        logger.error("[RateLimitFallback]", err);

        const now = Date.now();
        const entry = this.fallbackStore.get(key);

        //////////////////////////////////////////////////////////////////////

        if (!entry || entry.expiresAt < now) {
          if (entry) this.fallbackStore.delete(key);

          this.fallbackStore.set(key, {
            count: 1,
            expiresAt: now + WINDOW_SECONDS * 1000,
          });
          return next();
        }

        //////////////////////////////////////////////////////////////////////

        entry.count += 1;

        if (entry.count > MAX_REQUESTS) {
          logger.warn(`[RateLimitExceededFallback]: key=${key}`);
          return next(
            new ApiError(429, "Too many requests", {
              code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
            })
          );
        }

        //////////////////////////////////////////////////////////////////////

        return next();
      }
    };
  }
}
