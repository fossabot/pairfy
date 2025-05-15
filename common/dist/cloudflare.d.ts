import { Request, Response, NextFunction } from "express";
export declare const CLOUDFLARE_IP_RANGES: string[];
export declare const getPublicAddress: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
