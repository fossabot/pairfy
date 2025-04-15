import jwt, { JsonWebTokenError, TokenExpiredError, NotBeforeError } from "jsonwebtoken";
import { ApiError, ERROR_CODES } from "./errorHandler";


export function createToken(params: object, expires?: string) {
  const secretKey: jwt.Secret = process.env.AGENT_JWT_KEY as string;

  const defaultTime: any = process.env.TOKEN_EXPIRATION as string;

  const options: jwt.SignOptions = {
    expiresIn: expires || defaultTime,
  };

  return jwt.sign(params, secretKey, options);
}

export function verifyToken(token: string, key: string): any {
  try {
    return jwt.verify(token, key);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new ApiError(401, "Token expired", {
        code: ERROR_CODES.TOKEN_EXPIRED,
        isOperational: true,
      });
    }

    if (error instanceof NotBeforeError) {
      throw new ApiError(401, "Token not active yet", {
        code: ERROR_CODES.INVALID_TOKEN,
        isOperational: true,
      });
    }

    if (error instanceof JsonWebTokenError) {
      throw new ApiError(401, "Invalid token", {
        code: ERROR_CODES.INVALID_TOKEN,
        isOperational: true,
      });
    }

    throw new ApiError(500, "Internal token verification error", {
      code: ERROR_CODES.INTERNAL_ERROR,
      details: error,
      isOperational: false,
    });
  }
}


