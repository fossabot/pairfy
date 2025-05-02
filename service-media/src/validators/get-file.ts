import { z } from "zod";

export const verifyParams = z.object({
  groupId: z
    .string()
    .regex(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/, {
      message: "Invalid media group ID format",
    }),

  filename: z
    .string()
    .regex(/^[A-Za-z0-9_-]+\.(jpg|jpeg|png|webp|mp4|webm|mov)$/i, {
      message: "Invalid filename format",
    }),
});
