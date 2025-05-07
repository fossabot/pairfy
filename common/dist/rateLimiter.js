"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const index_1 = require("./index");
const token_1 = require("./token");
const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 20;
class RateLimiter {
    constructor(redisUrl) {
        this.redis = new ioredis_1.default(redisUrl, {
            retryStrategy(times) {
                if (times > 20)
                    return null;
                return Math.min(times * 100, 2000);
            },
        });
        this.redis.on("error", (err) => {
            index_1.logger.error("[RedisClientError]", err);
        });
        this.redis.on("connect", () => {
            index_1.logger.info("[RedisClientConnected]");
        });
        this.fallbackStore = new Map();
    }
    getMiddleware() {
        return async (req, res, next) => {
            let key = "";
            try {
                if (!req.publicAddress) {
                    throw new index_1.ApiError(500, "Internal Error", {
                        code: index_1.ERROR_CODES.INTERNAL_ERROR,
                    });
                }
                key = `ratelimit:ip:${req.publicAddress}`;
                const token = req.session?.jwt;
                if (token) {
                    try {
                        const decoded = (0, token_1.verifyToken)(token, process.env.AGENT_JWT_KEY);
                        if (decoded?.sub) {
                            key = `ratelimit:user:${decoded.sub}`;
                        }
                    }
                    catch {
                        // IP
                    }
                }
                const saved = await this.redis.set(key, 1, "EX", WINDOW_SECONDS, "NX");
                if (!saved) {
                    const current = await this.redis.incr(key);
                    if (current > MAX_REQUESTS) {
                        index_1.logger.warn(`[RateLimitExceeded]: key=${key}`);
                        throw new index_1.ApiError(429, "Too many requests", {
                            code: index_1.ERROR_CODES.RATE_LIMIT_EXCEEDED,
                        });
                    }
                }
                return next();
            }
            catch (err) {
                if (err instanceof index_1.ApiError) {
                    return next(err);
                }
                index_1.logger.error("[RateLimitFallback]", err);
                const now = Date.now();
                const entry = this.fallbackStore.get(key);
                //////////////////////////////////////////////////////////////////////
                if (!entry || entry.expiresAt < now) {
                    if (entry)
                        this.fallbackStore.delete(key);
                    this.fallbackStore.set(key, {
                        count: 1,
                        expiresAt: now + WINDOW_SECONDS * 1000,
                    });
                    return next();
                }
                //////////////////////////////////////////////////////////////////////
                entry.count += 1;
                if (entry.count > MAX_REQUESTS) {
                    index_1.logger.warn(`[RateLimitExceededFallback]: key=${key}`);
                    return next(new index_1.ApiError(429, "Too many requests", {
                        code: index_1.ERROR_CODES.RATE_LIMIT_EXCEEDED,
                    }));
                }
                //////////////////////////////////////////////////////////////////////
                return next();
            }
        };
    }
}
exports.RateLimiter = RateLimiter;
