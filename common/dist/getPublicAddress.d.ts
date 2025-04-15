import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            publicAddress?: any;
            session?: {
                jwt?: string;
                [key: string]: any;
            } | null | undefined;
        }
    }
}
export declare const getPublicAddress: (req: Request, res: Response, next: NextFunction) => void;
