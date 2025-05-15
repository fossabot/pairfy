import Redis from "ioredis";
import { Request, Response, NextFunction } from "express";
import { ApiError, ERROR_CODES, logger } from "./index";
import { verifyToken } from "./token";

interface RateLimiterOptions {
  windowSeconds?: number;
  maxRequests?: number;
  enableFallback?: boolean;
  maxFallbackEntries?: number;
}

const LUA_SCRIPT = `
local current
current = redis.call("INCR", KEYS[1])
if tonumber(current) == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])
end
local pttl = redis.call("PTTL", KEYS[1])
return {current, pttl}
`;

export class RateLimiter {
  private redis: Redis;
  private fallbackStore: Map<string, { count: number; expiresAt: number }>;
  private windowSeconds: number;
  private maxRequests: number;
  private enableFallback: boolean;
  private cleanupInterval: NodeJS.Timeout;
  private jwtKey: string;
  private maxFallbackEntries: number;

  constructor(redisUrl: string, options?: RateLimiterOptions) {
    this.windowSeconds = options?.windowSeconds ?? 60;
    this.maxRequests = options?.maxRequests ?? 20;
    this.enableFallback = options?.enableFallback ?? true;
    this.maxFallbackEntries = options?.maxFallbackEntries ?? 1000;

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

    // Cleanup expired fallback entries every 30 seconds for better memory management
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.fallbackStore) {
        if (entry.expiresAt <= now) {
          this.fallbackStore.delete(key);
        }
      }
    }, 30_000);

    const gracefulShutdown = () => {
      logger.info("RateLimiter shutting down...");
      this.shutdown().catch((err) =>
        logger.error("Error during RateLimiter shutdown", err)
      );
      // No se llama process.exit aquí para permitir cierre ordenado
    };

    process.once("SIGINT", gracefulShutdown);
    process.once("SIGTERM", gracefulShutdown);
  }

  private setRateLimitHeaders(
    res: Response,
    limit: number,
    remaining: number,
    resetTimestamp: number
  ) {
    res.setHeader("X-RateLimit-Limit", limit.toString());
    res.setHeader("X-RateLimit-Remaining", Math.max(0, remaining).toString());
    res.setHeader("X-RateLimit-Reset", resetTimestamp.toString());
  }

  public async shutdown() {
    clearInterval(this.cleanupInterval);
    await this.redis.disconnect();
  }

  getMiddleware() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      let key = "";

      try {
        // Obtener publicAddress de forma segura y validar
        const rawPublicAddress = (req as any).publicAddress;
        const publicAddress =
          typeof rawPublicAddress === "string" ? rawPublicAddress.trim() : "";

        if (!publicAddress) {
          return next(
            new ApiError(400, "Missing or invalid publicAddress for rate limit key", {
              code: ERROR_CODES.BAD_REQUEST,
            })
          );
        }

        key = `ratelimit:ip:${publicAddress}`;

        const token = req.session?.jwt;
        if (token) {
          try {
            const decoded = verifyToken(token, this.jwtKey) as { sub?: string };
            // Validar 'sub' para que sea string no vacío y solo caracteres válidos
            if (
              decoded?.sub &&
              typeof decoded.sub === "string" &&
              /^[a-zA-Z0-9_-]{3,64}$/.test(decoded.sub)
            ) {
              key = `ratelimit:user:${decoded.sub}`;
            } else {
              logger.warn(`[RateLimit] Invalid token sub claim for key=${key}`);
            }
          } catch (tokenErr) {
            logger.warn(`[RateLimit] Invalid token for key=${key}`, tokenErr);
          }
        }

        // Ejecutar script LUA atómico (usando PTTL para ms)
        const resultRaw = await this.redis.eval(
          LUA_SCRIPT,
          1,
          key,
          this.windowSeconds.toString() // Pasar como string explícitamente
        );

        if (
          !Array.isArray(resultRaw) ||
          resultRaw.length !== 2 ||
          typeof resultRaw[0] !== "number" ||
          typeof resultRaw[1] !== "number"
        ) {
          throw new Error("Invalid Redis eval response");
        }

        const [current, pttl] = resultRaw as [number, number];

        // pttl puede ser -1 (no expirado) o -2 (no existe)
        // Si pttl <= 0, usar windowSeconds * 1000 ms como fallback
        const ttlMs = pttl > 0 ? pttl : this.windowSeconds * 1000;

        // Reset timestamp en segundos unix
        const resetSeconds = Math.floor(Date.now() / 1000 + ttlMs / 1000);

        this.setRateLimitHeaders(
          res,
          this.maxRequests,
          this.maxRequests - current,
          resetSeconds
        );

        if (current > this.maxRequests) {
          logger.warn(
            `[RateLimitExceeded]: key=${key}, publicAddress=${publicAddress}`
          );
          return next(
            new ApiError(429, "Too many requests", {
              code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
            })
          );
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

        // fallbackKey corregido con paréntesis para que la ternaria funcione bien
        const fallbackKey =
          key ||
          ((req as any).publicAddress
            ? `ratelimit:fallback:ip:${(req as any).publicAddress}`
            : `ratelimit:fallback:unknown`);

        const now = Date.now();

        if (
          this.fallbackStore.size > this.maxFallbackEntries &&
          !this.fallbackStore.has(fallbackKey)
        ) {
          logger.error(
            "[RateLimitFallback] Fallback store full, rejecting request"
          );
          return next(
            new ApiError(429, "Too many requests - fallback store full", {
              code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
            })
          );
        }

        let entry = this.fallbackStore.get(fallbackKey);

        if (!entry || entry.expiresAt <= now) {
          if (entry) this.fallbackStore.delete(fallbackKey);

          this.fallbackStore.set(fallbackKey, {
            count: 1,
            expiresAt: now + this.windowSeconds * 1000,
          });

          this.setRateLimitHeaders(
            res,
            this.maxRequests,
            this.maxRequests - 1,
            Math.floor((now + this.windowSeconds * 1000) / 1000)
          );

          return next();
        }

        entry = {
          count: entry.count + 1,
          expiresAt: entry.expiresAt,
        };
        this.fallbackStore.set(fallbackKey, entry);

        this.setRateLimitHeaders(
          res,
          this.maxRequests,
          this.maxRequests - entry.count,
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
