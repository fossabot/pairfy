import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ERROR_CODES, logger } from "./index";

export class ApiError extends Error {
  public statusCode: number;
  public code: string;
  public details?: unknown;
  public isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    options?: { code?: string; details?: unknown; isOperational?: boolean }
  ) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.code = options?.code || ERROR_CODES.INTERNAL_ERROR;
    this.isOperational = options?.isOperational ?? true;

    if (options?.code === ERROR_CODES.VALIDATION_ERROR) {
      this.details = options.details;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target);
    }
  }
}

const normalizeError = (err: unknown): ApiError => {
  if (err instanceof ApiError) return err;

  if (err instanceof ZodError) {
    return new ApiError(400, "Validation error", {
      code: ERROR_CODES.VALIDATION_ERROR,
      details: err.flatten(),
      isOperational: true,
    });
  }

  if (err instanceof Error) {
    return new ApiError(500, "Internal server error", {
      code: ERROR_CODES.INTERNAL_ERROR,
      isOperational: false,
    });
  }

  return new ApiError(500, "Unknown internal error", {
    code: ERROR_CODES.INTERNAL_ERROR,
    isOperational: false,
  });
};

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err);

  const normalized = normalizeError(err);

  res.setHeader("Content-Type", "application/json");

  const errorResponse = {
    status: normalized.statusCode,
    message: normalized.isOperational
      ? normalized.message
      : "Internal server error",
    code: normalized.code,
    details:
      normalized.code === ERROR_CODES.VALIDATION_ERROR
        ? normalized.details
        : null,
  };

  logger.error(errorResponse);

  res.status(normalized.statusCode).json(errorResponse);
};
