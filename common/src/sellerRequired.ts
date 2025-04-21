import { ApiError, ApiGraphQLError, ERROR_CODES } from "./index";
import { Request, Response, NextFunction } from "express";

export const sellerRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.sellerData) {
    throw new ApiError(401, "Unauthorized", {
      code: ERROR_CODES.UNAUTHORIZED,
    });
  }

  next();
};

export const sellerRequiredGraphQL = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.sellerData) {
    throw new ApiGraphQLError(401, "Unauthorized", {
      code: ERROR_CODES.UNAUTHORIZED
    });
  }

  next();
};
