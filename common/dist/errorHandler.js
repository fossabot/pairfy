"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = exports.ApiError = void 0;
const zod_1 = require("zod");
const index_1 = require("./index");
class ApiError extends Error {
    constructor(statusCode, message, options) {
        super(message);
        this.name = new.target.name;
        this.statusCode = statusCode;
        this.code = options?.code || index_1.ERROR_CODES.INTERNAL_ERROR;
        this.isOperational = options?.isOperational ?? true;
        if (options?.code === index_1.ERROR_CODES.VALIDATION_ERROR) {
            this.details = options.details;
        }
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, new.target);
        }
    }
}
exports.ApiError = ApiError;
const normalizeError = (err) => {
    if (err instanceof ApiError)
        return err;
    if (err instanceof zod_1.ZodError) {
        return new ApiError(400, "Validation error", {
            code: index_1.ERROR_CODES.VALIDATION_ERROR,
            details: err.flatten(),
            isOperational: true,
        });
    }
    if (err instanceof Error) {
        return new ApiError(500, "Internal server error", {
            code: index_1.ERROR_CODES.INTERNAL_ERROR,
            isOperational: false,
        });
    }
    return new ApiError(500, "Unknown internal error", {
        code: index_1.ERROR_CODES.INTERNAL_ERROR,
        isOperational: false,
    });
};
const errorHandler = (err, _req, res, _next) => {
    const normalized = normalizeError(err);
    try {
        index_1.logger.error({
            name: normalized.name,
            message: normalized.message,
            code: normalized.code,
            statusCode: normalized.statusCode,
            stack: normalized.stack,
            ...(normalized.details && normalized.code === index_1.ERROR_CODES.VALIDATION_ERROR
                ? { details: normalized.details }
                : {}),
        });
    }
    catch (logErr) {
        index_1.logger.error("Failed to log error:", logErr);
    }
    res.setHeader("Content-Type", "application/json");
    res.status(normalized.statusCode).json({
        status: normalized.statusCode,
        message: normalized.isOperational ? normalized.message : "Internal server error",
        code: normalized.code,
        details: normalized.code === index_1.ERROR_CODES.VALIDATION_ERROR
            ? normalized.details
            : null,
    });
};
exports.errorHandler = errorHandler;
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.asyncHandler = asyncHandler;
