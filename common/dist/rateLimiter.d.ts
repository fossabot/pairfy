import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";
interface RateLimiterOptions {
    redisClient: Redis;
    jwtSecret: string;
    maxRequests: number;
    windowSeconds: number;
}
export declare class RateLimiterJWT {
    private redis;
    private jwtSecret;
    private maxRequests;
    private windowSeconds;
    private luaScript;
    constructor(options: RateLimiterOptions);
    /**
     * Express middleware para limitar solicitudes por usuario autenticado con JWT.
     */
    middleware(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    check(agentId: string): Promise<boolean>;
}
export {};
