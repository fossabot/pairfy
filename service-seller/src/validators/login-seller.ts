import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// HEX string validator
const hexRegex = /^[a-fA-F0-9]+$/;

// Email validator OWASP-compliant
const emailRegex =
  /^(?=.{1,254}$)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password policy: 8–64 chars, 1 lowercase, 1 uppercase, 1 digit, 1 special
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,64}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .regex(emailRegex, { message: "Invalid email format (OWASP-compliant)" }),

  password: z
    .string()
    .regex(passwordRegex, {
      message:
        "Password must be 8–64 characters and include uppercase, lowercase, number, and special character",
    }),

  signature: z.object({
    key: z
      .string()
      .min(64, "Key must be at least 64 hex characters")
      .max(512, "Key too long")
      .regex(hexRegex, "Key must be a valid hex string"),

    signature: z
      .string()
      .min(64, "Signature must be at least 64 hex characters")
      .max(2048, "Signature too long")
      .regex(hexRegex, "Signature must be a valid hex string"),
  }),

  address: z
    .string()
    .min(64, "Address must be at least 64 hex characters")
    .max(256, "Address too long")
    .regex(hexRegex, "Address must be a valid hex string"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const validateParams = (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return res.status(400).json({ errors });
  }

  req.body = result.data;
  next();
};
