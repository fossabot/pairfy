"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiptapDocumentSchema = exports.TiptapNodeSchema = void 0;
exports.sanitizeTiptapContent = sanitizeTiptapContent;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const zod_1 = require("zod");
exports.TiptapNodeSchema = zod_1.z.lazy(() => zod_1.z.object({
    type: zod_1.z.string(),
    attrs: zod_1.z.record(zod_1.z.any()).optional(),
    content: zod_1.z.array(exports.TiptapNodeSchema).optional(),
    text: zod_1.z.string().optional(),
    marks: zod_1.z
        .array(zod_1.z.object({
        type: zod_1.z.string(),
        attrs: zod_1.z.record(zod_1.z.any()).optional(),
    }))
        .optional(),
}));
exports.TiptapDocumentSchema = zod_1.z.object({
    type: zod_1.z.literal("doc"),
    content: zod_1.z.array(exports.TiptapNodeSchema).min(1),
});
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
