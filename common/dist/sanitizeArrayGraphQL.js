"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeArrayGraphQL = sanitizeArrayGraphQL;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const index_1 = require("./index");
/**Returns graphQLError */
function sanitizeArrayGraphQL(input) {
    const clean = (str) => (0, sanitize_html_1.default)(str.trim(), {
        allowedTags: [],
        allowedAttributes: {},
        allowedSchemes: [],
    });
    if (typeof input === 'string') {
        return clean(input);
    }
    if (Array.isArray(input) && input.every(item => typeof item === 'string')) {
        const sanitizedArray = input
            .map(item => clean(item))
            .filter(item => item.length > 0);
        return sanitizedArray;
    }
    throw new index_1.ApiGraphQLError(400, 'Invalid bullet list symbols', {
        code: index_1.ERROR_CODES.BAD_USER_INPUT
    });
}
