import { z } from "zod";

export const validateParams = z.object({
  prompt: z
    .string({
      required_error: "Search text is required",
    })
    .min(1, "Search text is required")
    .max(300, "Search text too long"),
});
