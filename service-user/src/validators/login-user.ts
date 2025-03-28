import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors';

// Zod schema
const schema = z.object({
  signature: z.object({
    key: z.string()
      .regex(/^[a-f0-9]+$/i, 'Key must be a hex string')
      .min(64, 'Key too short')
      .max(512, 'Key too long'),
    signature: z.string()
      .regex(/^[a-f0-9]+$/i, 'Signature must be a hex string')
      .min(64, 'Signature too short')
      .max(2048, 'Signature too long')
  }),
  address: z.string()
    .regex(/^[a-f0-9]+$/i, 'Address must be a hex string')
    .min(64, 'Address too short')
    .max(512, 'Address too long'),
  terms_accepted: z.literal(true)
}).strict(); // No extra keys allowed

// Middleware
export const loginUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError("WrongParams");
  }

  next();
};
