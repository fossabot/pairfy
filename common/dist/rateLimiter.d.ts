import { Request, Response, NextFunction } from "express";
export declare class RateLimiter {
    private redis;
    private fallbackStore;
    constructor(redisUrl: string);
    getMiddleware(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
