import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";
interface RateLimiterOptions {
    redisClient?: Redis;
    redisUrl?: string;
    jwtSecret: string;
    maxRequests: number;
    windowSeconds: number;
    source: string;
}
export declare class RateLimiterJWT {
    private redis;
    private jwtSecret;
    private maxRequests;
    private windowSeconds;
    private source;
    private luaScript;
    constructor(options: RateLimiterOptions);
    private addListeners;
    private verifyToken;
    /** Express rateLimitJwt middleware */
    middleware(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /** GraphQL rateLimitJwt check */
    check(agentId: string): Promise<boolean>;
}
export {};
