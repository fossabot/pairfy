import Redis from "ioredis";
import { Request, Response, NextFunction } from "express";
import { ApiError, ERROR_CODES, logger } from "./index";
import { verifyToken } from "./token";

interface RateLimiterOptions {
  windowSeconds?: number;
  maxRequests?: number;
}

export class RateLimiter {
  private redis: Redis;
  private fallbackStore: Map<string, { count: number; expiresAt: number }>;
  private windowSeconds: number;
  private maxRequests: number;

  constructor(redisUrl: string, options?: RateLimiterOptions) {
    this.windowSeconds = options?.windowSeconds ?? 60;
    this.maxRequests = options?.maxRequests ?? 20;

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

    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.fallbackStore) {
        if (entry.expiresAt < now) {
          this.fallbackStore.delete(key);
        }
      }
    }, 60_000);
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
            // fallback a IP
          }
        }

        const saved = await this.redis.set(
          key,
          1,
          "EX",
          this.windowSeconds,
          "NX"
        );

        if (saved) {
          // Primera solicitud: set headers y sigue
          res.setHeader("X-RateLimit-Limit", this.maxRequests);
          res.setHeader("X-RateLimit-Remaining", this.maxRequests - 1);
          res.setHeader(
            "X-RateLimit-Reset",
            Math.floor(Date.now() / 1000) + this.windowSeconds
          );
          return next();
        }

        const current = await this.redis.incr(key);
        const ttl = await this.redis.ttl(key);

        res.setHeader("X-RateLimit-Limit", this.maxRequests);
        res.setHeader("X-RateLimit-Remaining", Math.max(0, this.maxRequests - current));
        res.setHeader(
          "X-RateLimit-Reset",
          Math.floor(Date.now() / 1000) + ttl
        );

        if (current > this.maxRequests) {
          logger.warn(`[RateLimitExceeded]: key=${key}`);
          throw new ApiError(429, "Too many requests", {
            code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
          });
        }

        return next();
      } catch (err) {
        // Fallback local si Redis falla
        if (err instanceof ApiError) {
          return next(err);
        }

        logger.error("[RateLimitFallback]", err);

        const now = Date.now();
        const entry = this.fallbackStore.get(key);

        if (!entry || entry.expiresAt < now) {
          if (entry) this.fallbackStore.delete(key);
          this.fallbackStore.set(key, {
            count: 1,
            expiresAt: now + this.windowSeconds * 1000,
          });

          res.setHeader("X-RateLimit-Limit", this.maxRequests);
          res.setHeader("X-RateLimit-Remaining", this.maxRequests - 1);
          res.setHeader(
            "X-RateLimit-Reset",
            Math.floor(now / 1000) + this.windowSeconds
          );

          return next();
        }

        entry.count += 1;

        res.setHeader("X-RateLimit-Limit", this.maxRequests);
        res.setHeader(
          "X-RateLimit-Remaining",
          Math.max(0, this.maxRequests - entry.count)
        );
        res.setHeader(
          "X-RateLimit-Reset",
          Math.floor(entry.expiresAt / 1000)
        );

        if (entry.count > this.maxRequests) {
          logger.warn(`[RateLimitExceededFallback]: key=${key}`);
          return next(
            new ApiError(429, "Too many requests", {
              code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
            })
          );
        }

        return next();
      }
    };
  }
}
