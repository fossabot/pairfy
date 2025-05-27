"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeTiptapContent = sanitizeTiptapContent;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
function sanitizeTiptapContent(node) {
    const sanitizedNode = { ...node };
    if (sanitizedNode.text) {
        sanitizedNode.text = (0, sanitize_html_1.default)(sanitizedNode.text, {
            allowedTags: [],
            allowedAttributes: {},
        });
    }
    if (sanitizedNode.attrs) {
        for (const key in sanitizedNode.attrs) {
            if (typeof sanitizedNode.attrs[key] === "string") {
                sanitizedNode.attrs[key] = (0, sanitize_html_1.default)(sanitizedNode.attrs[key], {
                    allowedTags: [],
                    allowedAttributes: {},
                });
            }
        }
    }
    if (sanitizedNode.content && Array.isArray(sanitizedNode.content)) {
        sanitizedNode.content = sanitizedNode.content.map(sanitizeTiptapContent);
    }
    return sanitizedNode;
}
