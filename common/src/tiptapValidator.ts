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
