"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterJWT = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("./logger");
const errorHandler_1 = require("./errorHandler");
const errorCodes_1 = require("./errorCodes");
class RateLimiterJWT {
    constructor(options) {
        this.luaScript = `
    local key = KEYS[1]
    local limit = tonumber(ARGV[1])
    local window = tonumber(ARGV[2])

    local current = tonumber(redis.call("GET", key) or "0")
    if current + 1 > limit then
      return 0
    else
      current = redis.call("INCR", key)
      if current == 1 then
        redis.call("EXPIRE", key, window)
      end
      return current
    end
  `;
        if (!options.source || options.source.trim() === "") {
            throw new Error("La opción 'source' es obligatoria y no puede estar vacía.");
        }
        if (!Number.isInteger(options.maxRequests) || options.maxRequests <= 0) {
            throw new Error("'maxRequests' debe ser un número entero positivo.");
        }
        if (!Number.isInteger(options.windowSeconds) || options.windowSeconds <= 0) {
            throw new Error("'windowSeconds' debe ser un número entero positivo.");
        }
        if (!options.jwtSecret || options.jwtSecret.trim() === "") {
            throw new Error("La opción 'jwtSecret' es obligatoria y no puede estar vacía.");
        }
        if (options.redisClient) {
            this.redis = options.redisClient;
        }
        else if (options.redisUrl) {
            this.redis = new ioredis_1.default(options.redisUrl);
        }
        else {
            throw new Error("Debes proporcionar un redisClient o una redisUrl en RateLimiterOptions.");
        }
        this.addListeners();
        this.source = options.source;
        this.jwtSecret = options.jwtSecret;
        this.maxRequests = options.maxRequests ?? 100;
        this.windowSeconds = options.windowSeconds ?? 60;
        this.middleware = this.middleware.bind(this);
    }
    addListeners() {
        this.redis.on("error", (error) => {
            console.error({
                service: this.source,
                event: "redis.error",
                message: "redis listener error",
                error,
            });
        });
        this.redis.on("close", () => {
            console.warn({
                service: this.source,
                event: "redis.close",
                message: "redis close event",
            });
        });
        this.redis.on("reconnecting", (time) => {
            console.info({
                service: this.source,
                event: "redis.reconnecting",
                message: `[Redis]: reintentando conexión en ${time}ms`,
            });
        });
        this.redis.on("end", () => {
            console.warn({
                service: this.source,
                event: "redis.end",
                message: "ratelimit redis end event",
            });
        });
    }
    verifyToken(req) {
        try {
            const token = req.session?.jwt;
            if (!token)
                return null;
            const agent = jsonwebtoken_1.default.verify(token, this.jwtSecret);
            return agent?.id || null;
        }
        catch {
            return null;
        }
    }
    /**Express rateLimitJwt middleware */
    middleware() {
        return async (req, res, next) => {
            try {
                const agentId = this.verifyToken(req);
                if (!agentId) {
                    return next(new errorHandler_1.ApiError(401, "Invalid session or token", {
                        code: errorCodes_1.ERROR_CODES.UNAUTHORIZED,
                    }));
                }
                const key = `ratelimit:${this.source}:agent:${agentId}`;
                const result = await this.redis.eval(this.luaScript, 1, key, this.maxRequests, this.windowSeconds);
                if (result === 0) {
                    return next(new errorHandler_1.ApiError(429, "Demasiadas solicitudes, intenta más tarde", {
                        code: errorCodes_1.ERROR_CODES.RATE_LIMIT_EXCEEDED,
                    }));
                }
                return next();
            }
            catch (error) {
                return next(new errorHandler_1.ApiError(503, "Servicio no disponible temporalmente", {
                    code: errorCodes_1.ERROR_CODES.SERVICE_UNAVAILABLE,
                }));
            }
        };
    }
    /**GraphQL rateLimitJwt check */
    async check(agentId) {
        try {
            const key = `ratelimit:${this.source}:agent:${agentId}`;
            const result = await this.redis.eval(this.luaScript, 1, key, this.maxRequests, this.windowSeconds);
            if (result === 0) {
                logger_1.logger.warn({
                    service: this.source,
                    event: "ratelimit.exceeded",
                    message: "ratelimit exceeded by agent",
                    agentId,
                });
            }
            return result !== 0;
        }
        catch (error) {
            logger_1.logger.error({
                service: this.source,
                event: "ratelimit.error",
                message: "ratelimit error",
                error: error,
            });
            return false;
        }
    }
}
exports.RateLimiterJWT = RateLimiterJWT;
