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
  const normalized = normalizeError(err);


  try {
    logger.error({
      name: normalized.name,
      message: normalized.message,
      code: normalized.code,
      statusCode: normalized.statusCode,
      stack: normalized.stack,
      ...(normalized.details && normalized.code === ERROR_CODES.VALIDATION_ERROR
        ? { details: normalized.details }
        : {}),
    });
  } catch (logErr) {
    logger.error("Failed to log error:", logErr);
  }

  res.setHeader("Content-Type", "application/json");

  res.status(normalized.statusCode).json({
    status: normalized.statusCode,
    message: normalized.isOperational ? normalized.message : "Internal server error",
    code: normalized.code,
    details:
      normalized.code === ERROR_CODES.VALIDATION_ERROR
        ? normalized.details
        : null,
  });
};


export const asyncHandler =
  (fn: (...args: any[]) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
