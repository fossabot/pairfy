"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwGraphQLError = exports.normalizeGraphError = exports.ApiGraphQLError = void 0;
const graphql_1 = require("graphql");
const zod_1 = require("zod");
const index_1 = require("./index");
class ApiGraphQLError extends graphql_1.GraphQLError {
    constructor(message, options = {}) {
        const code = options.code ?? index_1.ERROR_CODES.INTERNAL_ERROR;
        const statusCode = options.statusCode ?? 500;
        super(message, {
            extensions: {
                code,
                status: statusCode,
                ...(code === index_1.ERROR_CODES.VALIDATION_ERROR && options.details
                    ? { details: options.details }
                    : {}),
            },
            path: options.path,
        });
        this.code = code;
        this.statusCode = statusCode;
    }
}
exports.ApiGraphQLError = ApiGraphQLError;
const normalizeGraphError = (err) => {
    if (err instanceof ApiGraphQLError)
        return err;
    if (err instanceof zod_1.ZodError) {
        return new ApiGraphQLError("Validation error", {
            code: index_1.ERROR_CODES.VALIDATION_ERROR,
            statusCode: 400,
            details: err.flatten(),
        });
    }
    if (err instanceof graphql_1.GraphQLError) {
        return new ApiGraphQLError(err.message, {
            code: err.extensions.code || index_1.ERROR_CODES.INTERNAL_ERROR,
            statusCode: err.extensions.status || 500,
            path: err.path,
        });
    }
    if (err instanceof Error) {
        return new ApiGraphQLError("Internal server error", {
            code: index_1.ERROR_CODES.INTERNAL_ERROR,
            statusCode: 500,
        });
    }
    return new ApiGraphQLError("Unknown internal error", {
        code: index_1.ERROR_CODES.INTERNAL_ERROR,
        statusCode: 500,
    });
};
exports.normalizeGraphError = normalizeGraphError;
const throwGraphQLError = (message, options) => {
    throw new ApiGraphQLError(message, options);
};
exports.throwGraphQLError = throwGraphQLError;
