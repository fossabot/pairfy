import { z } from "zod";
export declare const TiptapNodeSchema: z.ZodSchema<any>;
export declare const TiptapDocumentSchema: z.ZodObject<{
    type: z.ZodLiteral<"doc">;
    content: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "doc";
    content: any[];
}, {
    type: "doc";
    content: any[];
}>;
export declare function sanitizeTiptapContent(node: any): any;
