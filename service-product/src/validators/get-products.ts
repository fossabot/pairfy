import { z } from "zod";

export const verifyParams = z.object({
  cursor: z
    .union([
      z.literal("NOT"), 
      z
        .string()
        .refine(val => /^\d{13}$/.test(val), {
          message: "Cursor must be a 13-digit UNIX timestamp in milliseconds",
        }),
    ])
});
