"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicAddress = void 0;
const getPublicAddress = (req, res, next) => {
    req.publicAddress = req.headers["cf-connecting-ip"] ||
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.ip;
    next();
};
exports.getPublicAddress = getPublicAddress;
