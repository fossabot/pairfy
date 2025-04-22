"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventId = exports.getProductId = exports.getSellerId = void 0;
exports.createId = createId;
const nanoid_1 = require("nanoid");
function createId(alphabet, length) {
    if (!alphabet || typeof alphabet !== "string") {
        throw new Error("Invalid alphabet");
    }
    if (!Number.isInteger(length) || length <= 0) {
        throw new Error("Length must be a positive integer");
    }
    return (0, nanoid_1.customAlphabet)(alphabet, length)();
}
const getSellerId = () => {
    return createId("0123456789ABCD", 21);
};
exports.getSellerId = getSellerId;
const getProductId = () => {
    return createId("ACDEHILMOTUVWXY01378", 21);
};
exports.getProductId = getProductId;
const getEventId = () => {
    return createId("abcdefghijklmnopqrstuvwxyz0123456789", 21);
};
exports.getEventId = getEventId;
