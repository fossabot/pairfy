"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("./index");
const sellerMiddleware = (req, res, next) => {
    if (!req.session?.jwt) {
        return next();
    }
    try {
        const sessionData = jsonwebtoken_1.default.verify(req.session.jwt, process.env.AGENT_JWT_KEY);
        if (sessionData.role === "SELLER") {
            const scheme = {
                ...sessionData,
                token: req.session.jwt,
            };
            req.sellerData = scheme;
        }
    }
    catch (err) {
        index_1.logger.error(err);
    }
    return next();
};
exports.sellerMiddleware = sellerMiddleware;
