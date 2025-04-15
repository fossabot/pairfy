"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = exports.ApiError = exports.ERROR_CODES = void 0;
const zod_1 = require("zod");
const logger_1 = __importDefault(require("./logger"));
exports.ERROR_CODES = {
    BAD_REQUEST: "BAD_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
    CONFLICT: "CONFLICT",
    PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
    UNSUPPORTED_MEDIA_TYPE: "UNSUPPORTED_MEDIA_TYPE",
    VALIDATION_ERROR: "VALIDATION_ERROR",
    INVALID_TOKEN: "INVALID_TOKEN",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    MISSING_FIELDS: "MISSING_FIELDS",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    RESOURCE_ALREADY_EXISTS: "RESOURCE_ALREADY_EXISTS",
    RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
    INVALID_SIGNATURE: "INVALID_SIGNATURE",
    UPDATE_CONFLICT: "UPDATE_CONFLICT",
    INTERNAL_ERROR: "INTERNAL_ERROR",
    SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
    TIMEOUT_ERROR: "TIMEOUT_ERROR",
    DATABASE_ERROR: "DATABASE_ERROR",
    CACHE_ERROR: "CACHE_ERROR",
    EMAIL_DELIVERY_ERROR: "EMAIL_DELIVERY_ERROR",
    DEPENDENCY_FAILURE: "DEPENDENCY_FAILURE",
    INSUFFICIENT_FUNDS: "INSUFFICIENT_FUNDS",
    ACCOUNT_SUSPENDED: "ACCOUNT_SUSPENDED",
    VERIFICATION_FAILED: "VERIFICATION_FAILED",
    OPERATION_NOT_PERMITTED: "OPERATION_NOT_PERMITTED",
    ACTION_NOT_ALLOWED: "ACTION_NOT_ALLOWED",
    DUPLICATE_OPERATION: "DUPLICATE_OPERATION",
    RESOURCE_LOCKED: "RESOURCE_LOCKED",
};
class ApiError extends Error {
    constructor(statusCode, message, options) {
        super(message);
        this.name = new.target.name;
        this.statusCode = statusCode;
        this.code = options?.code || "INTERNAL_ERROR";
        this.details = options?.details;
        this.isOperational = options?.isOperational ?? true;
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
            code: "VALIDATION_ERROR",
            details: err.flatten(),
            isOperational: true,
        });
    }
    if (err instanceof Error) {
        return new ApiError(500, err.message || "Internal error", {
            code: "INTERNAL_ERROR",
            details: { stack: err.stack },
            isOperational: false,
        });
    }
    return new ApiError(500, "Unknown internal error", {
        code: "INTERNAL_ERROR",
        details: { raw: err },
        isOperational: false,
    });
};
const errorHandler = (err, _req, res, _next) => {
    const normalized = normalizeError(err);
    res.setHeader("Content-Type", "application/json");
    logger_1.default.error(normalized);
    return res.status(normalized.statusCode).json({
        status: normalized.statusCode,
        message: normalized.message,
        code: normalized.code,
        details: normalized.details ?? null,
    });
};
exports.errorHandler = errorHandler;
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.asyncHandler = asyncHandler;
