"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const index_1 = require("./index");
function createToken(params, expires) {
    const secretKey = process.env.AGENT_JWT_KEY;
    const defaultTime = process.env.TOKEN_EXPIRATION;
    const options = {
        expiresIn: expires || defaultTime,
    };
    return jsonwebtoken_1.default.sign(params, secretKey, options);
}
/**Verifies JWT token, raises TokenExpiredError, NotBeforeError, JsonWebTokenError */
function verifyToken(token, key) {
    try {
        return jsonwebtoken_1.default.verify(token, key);
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new index_1.ApiError(401, "Token expired", {
                code: index_1.ERROR_CODES.TOKEN_EXPIRED,
                isOperational: true,
            });
        }
        if (error instanceof jsonwebtoken_1.NotBeforeError) {
            throw new index_1.ApiError(401, "Token not active yet", {
                code: index_1.ERROR_CODES.INVALID_TOKEN,
                isOperational: true,
            });
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw new index_1.ApiError(401, "Invalid token", {
                code: index_1.ERROR_CODES.INVALID_TOKEN,
                isOperational: true,
            });
        }
        throw new index_1.ApiError(500, "Internal token verification error", {
            code: index_1.ERROR_CODES.INTERNAL_ERROR,
            details: error,
            isOperational: false,
        });
    }
}
