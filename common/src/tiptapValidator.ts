import sanitizeHtml from "sanitize-html";
import { z } from "zod";

export const TiptapNodeSchema: z.ZodSchema<any> = z.lazy(() =>
  z.object({
    type: z.string(),
    attrs: z.record(z.any()).optional(),
    content: z.array(TiptapNodeSchema).optional(),
    text: z.string().optional(),
    marks: z
      .array(
        z.object({
          type: z.string(),
          attrs: z.record(z.any()).optional(),
        })
      )
      .optional(),
  })
);

export const TiptapDocumentSchema = z.object({
  type: z.literal("doc"),
  content: z.array(TiptapNodeSchema).min(1),
});


export function sanitizeTiptapContent(node: any): any {
  const sanitizedNode: any = { ...node };

  if (sanitizedNode.text) {
    sanitizedNode.text = sanitizeHtml(sanitizedNode.text, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }

  if (sanitizedNode.attrs) {
    for (const key in sanitizedNode.attrs) {
      if (typeof sanitizedNode.attrs[key] === "string") {
        sanitizedNode.attrs[key] = sanitizeHtml(sanitizedNode.attrs[key], {
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
