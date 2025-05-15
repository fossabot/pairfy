import Redis from "ioredis";
import { Request, Response, NextFunction } from "express";
import { ApiError, ERROR_CODES, logger } from "./index";
import { verifyToken } from "./token";

interface RateLimiterOptions {
  windowSeconds?: number;
  maxRequests?: number;
  enableFallback?: boolean;
}

const LUA_SCRIPT = `
local current
current = redis.call("INCR", KEYS[1])
if tonumber(current) == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])
end
local ttl = redis.call("TTL", KEYS[1])
return {current, ttl}
`;

export class RateLimiter {
  private redis: Redis;
  private fallbackStore: Map<string, { count: number; expiresAt: number }>;
  private windowSeconds: number;
  private maxRequests: number;
  private enableFallback: boolean;
  private cleanupInterval: NodeJS.Timeout;
  private jwtKey: string;

  constructor(redisUrl: string, options?: RateLimiterOptions) {
    this.windowSeconds = options?.windowSeconds ?? 60;
    this.maxRequests = options?.maxRequests ?? 20;
    this.enableFallback = options?.enableFallback ?? true;

    const envJwtKey = process.env.AGENT_JWT_KEY;
    if (!envJwtKey) {
      throw new Error("Missing environment variable AGENT_JWT_KEY");
    }
    this.jwtKey = envJwtKey;

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

    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.fallbackStore) {
        if (entry.expiresAt < now) {
          this.fallbackStore.delete(key);
        }
      }
    }, 60_000);
  }

  private setRateLimitHeaders(
    res: Response,
    limit: number,
    remaining: number,
    resetTimestamp: number
  ) {
    res.setHeader("X-RateLimit-Limit", limit.toString());
    res.setHeader("X-RateLimit-Remaining", remaining.toString());
    res.setHeader("X-RateLimit-Reset", resetTimestamp.toString());
  }

  public shutdown() {
    clearInterval(this.cleanupInterval);
    this.redis.disconnect();
  }

  getMiddleware() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      let key = "";

      try {
        // Defensive fallback if publicAddress is missing or empty
        const publicAddress = (req as any).publicAddress || req.ip || "unknown";

        // Base key on IP fallback
        key = `ratelimit:ip:${publicAddress}`;

        const token = req.session?.jwt;
        if (token) {
          try {
            const decoded = verifyToken(token, this.jwtKey) as { sub?: string };
            if (decoded?.sub) {
              key = `ratelimit:user:${decoded.sub}`;
            }
          } catch (tokenErr) {
            logger.warn(`[RateLimit] Invalid token for key=${key}`, tokenErr);
          }
        }

        if (!key) {
          return next(
            new ApiError(400, "Invalid rate limit key", {
              code: ERROR_CODES.BAD_REQUEST,
            })
          );
        }

        // Run Lua script: returns [number current, number ttl]
        const result = (await this.redis.eval(
          LUA_SCRIPT,
          1,
          key,
          this.windowSeconds
        )) as [number, number];

        const current = result[0];
        const ttl = result[1];

        const resetSeconds =
          ttl > 0
            ? Math.floor(Date.now() / 1000) + ttl
            : Math.floor(Date.now() / 1000) + this.windowSeconds;

        this.setRateLimitHeaders(
          res,
          this.maxRequests,
          Math.max(0, this.maxRequests - current),
          resetSeconds
        );

        if (current > this.maxRequests) {
          logger.warn(`[RateLimitExceeded]: key=${key}, ip=${publicAddress}`);
          throw new ApiError(429, "Too many requests", {
            code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
          });
        }

        return next();
      } catch (err) {
        if (err instanceof ApiError) {
          return next(err);
        }

        if (!this.enableFallback) {
          return next(err);
        }

        logger.error("[RateLimitFallback]", err);

        const fallbackKey = key || `ratelimit:fallback:unknown`;

        const now = Date.now();
        let entry = this.fallbackStore.get(fallbackKey);

        if (!entry || entry.expiresAt < now) {
          if (entry) this.fallbackStore.delete(fallbackKey);
          this.fallbackStore.set(fallbackKey, {
            count: 1,
            expiresAt: now + this.windowSeconds * 1000,
          });

          this.setRateLimitHeaders(
            res,
            this.maxRequests,
            this.maxRequests - 1,
            Math.floor(now / 1000) + this.windowSeconds
          );

          return next();
        }

        entry.count += 1;

        this.setRateLimitHeaders(
          res,
          this.maxRequests,
          Math.max(0, this.maxRequests - entry.count),
          Math.floor(entry.expiresAt / 1000)
        );

        if (entry.count > this.maxRequests) {
          logger.warn(`[RateLimitExceededFallback]: key=${fallbackKey}`);
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
