"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        /**
         * Express middleware para limitar solicitudes por usuario autenticado con JWT.
         */
        this.middleware = async (req, res, next) => {
            try {
                const token = req.session?.jwt;
                if (!token) {
                    return res.status(401).json({ error: "No se proporcionó token JWT" });
                }
                const agent = jsonwebtoken_1.default.verify(token, this.jwtSecret);
                if (!agent?.id) {
                    return res.status(401).json({ error: "Usuario inválido" });
                }
                const key = `ratelimit:agent:${agent.id}`;
                const result = await this.redis.eval(this.luaScript, 1, key, this.maxRequests, this.windowSeconds);
                if (result === 0) {
                    return res
                        .status(429)
                        .json({ error: "Demasiadas solicitudes, intenta más tarde" });
                }
                return next();
            }
            catch (error) {
                console.error("Error en RateLimiter:", error);
                return res
                    .status(503)
                    .json({ error: "Servicio no disponible. Intenta más tarde." });
            }
        };
        this.redis = options.redisClient;
        this.jwtSecret = options.jwtSecret;
        this.maxRequests = options.maxRequests;
        this.windowSeconds = options.windowSeconds;
    }
    async check(agentId) {
        const key = `ratelimit:agent:${agentId}`;
        const result = await this.redis.eval(this.luaScript, 1, key, this.maxRequests, this.windowSeconds);
        return result !== 0;
    }
}
exports.RateLimiterJWT = RateLimiterJWT;
