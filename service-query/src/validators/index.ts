import { z } from "zod";

export const getProductInputSchema = z.object({
  id: z
    .string()
    .min(1, "Product ID is required")
    .max(100, "Product ID is too long")
    .regex(/^[a-zA-Z0-9]+$/, "Invalid characters in Product ID"),
});

export const stringFilterInputSchema = z.object({
  enabled: z.boolean(),
  value: z.string().max(100),
});

export const booleanFilterInputSchema = z.object({
  enabled: z.boolean(),
  value: z.boolean(),
});

export const priceRangeInputSchema = z.object({
  gte: z.number().min(0).max(1_000_000),
  lte: z.number().min(0).max(1_000_000)
});

export const priceFilterInputSchema = z.object({
  enabled: z.boolean(),
  value: priceRangeInputSchema,
});

export const sortFieldSchema = z.object({
  enabled: z.boolean(),
  value: z.enum(['asc', 'desc'])
});


export const sortInputSchema = z.object({
  price: sortFieldSchema,
  rating: sortFieldSchema,
  reviews: sortFieldSchema,
  discount_value: sortFieldSchema
});

