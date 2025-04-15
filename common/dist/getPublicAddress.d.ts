import { Request, Response, NextFunction } from "express";
import { SellerToken } from "./index";
declare global {
    namespace Express {
        interface Request {
            sellerData?: SellerToken | undefined;
            publicAddress?: any;
            session?: {
                jwt?: string;
                [key: string]: any;
            } | null | undefined;
        }
    }
}
export declare const getPublicAddress: (req: Request, res: Response, next: NextFunction) => void;
