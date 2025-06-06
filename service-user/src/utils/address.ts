import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      publicAddress?: any;
    }
  }
}

export const getPublicAddress = (req: Request, res: Response, next: NextFunction) => {
  req.publicAddress = req.headers["cf-connecting-ip"] ||
                    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
                    req.ip;

  next();
};
