"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiptapDocumentSchema = exports.TiptapNodeSchema = void 0;
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
