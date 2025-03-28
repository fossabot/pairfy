import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { logger } from ".";

interface AdminToken {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      adminData: AdminToken;
    }
  }
}

const adminMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const sessionData = jwt.verify(
      req.session.jwt,
      process.env.ADMIN_JWT_KEY!
    ) as AdminToken;

    if (sessionData.role !== "ADMIN") {
      return next();
    }

    const scheme =  {
      ...sessionData,
      token: req.session.jwt
    }

    req.adminData = scheme;
  } catch (err) {
    logger.error(err);
  }

  next();
};

export { adminMiddleWare, AdminToken };
