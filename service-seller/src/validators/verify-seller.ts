import { z } from "zod";

export const verifySellerValidator = z.object({
  token: z.string().min(100, "Token too short"),
});
