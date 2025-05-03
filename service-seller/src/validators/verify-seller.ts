import { z } from "zod";

export const tokenValidator = z.object({
  token:   z.string()
  .min(100, { message: "JWT is too short" })
  .max(2000, { message: "JWT is too long" }) 
  .regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
    { message: "Invalid JWT format" }
  )
});


export const tokenTypeValidator = z.object({
  source: z.literal("service-seller"),
  role: z.literal("SELLER"),
  email: z.string().email(),
  username: z.string(),
});
