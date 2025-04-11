import { z } from "zod";

export const verifySellerValidator = z.object({
  token:   z.string()
  .min(100, { message: "JWT is too short" })
  .max(2000, { message: "JWT is too long" }) 
  .regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
    { message: "Invalid JWT format" }
  )
});
