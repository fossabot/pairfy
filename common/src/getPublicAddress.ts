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

export const getPublicAddress = (req: Request, res: Response, next: NextFunction) => {
  req.publicAddress = req.headers["cf-connecting-ip"] ||
                    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
                    req.ip;

  next();
};
