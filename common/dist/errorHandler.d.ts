import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
export declare class ApiError extends Error {
    statusCode: number;
    code: string;
    details?: unknown;
    isOperational: boolean;
    constructor(statusCode: number, message: string, options?: {
        code?: string;
        details?: unknown;
        isOperational?: boolean;
    });
}
export declare const errorHandler: ErrorRequestHandler;
export declare const asyncHandler: (fn: (...args: any[]) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
