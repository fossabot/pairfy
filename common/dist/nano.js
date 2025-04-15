"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
