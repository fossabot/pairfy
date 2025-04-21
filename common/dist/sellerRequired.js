"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerRequiredGraphQL = exports.sellerRequired = void 0;
const index_1 = require("./index");
const sellerRequired = (req, res, next) => {
    if (!req.sellerData) {
        throw new index_1.ApiError(401, "Unauthorized", {
            code: index_1.ERROR_CODES.UNAUTHORIZED,
        });
    }
    next();
};
exports.sellerRequired = sellerRequired;
const sellerRequiredGraphQL = (req, res, next) => {
    if (!req.sellerData) {
        throw new index_1.ApiGraphQLError(401, "Unauthorized", {
            code: index_1.ERROR_CODES.UNAUTHORIZED
        });
    }
    next();
};
exports.sellerRequiredGraphQL = sellerRequiredGraphQL;
