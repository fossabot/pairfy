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
  value: z.string().max(100).optional(),
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

export const sortInputSchema = z.object({
  price: stringFilterInputSchema,
  rating: stringFilterInputSchema,
  reviews: stringFilterInputSchema,
  discount_value: stringFilterInputSchema,
});

export const searchProductInputSchema = z.object({
    text: z.string().max(300, 'Search text too long'),
    sku: stringFilterInputSchema,
    brand: stringFilterInputSchema,
    model: stringFilterInputSchema,
    category: stringFilterInputSchema,
    quality: stringFilterInputSchema,
    discount: booleanFilterInputSchema,
    best_seller: booleanFilterInputSchema,
    price: priceFilterInputSchema,
    sort: sortInputSchema,
    tag: z.string()
    .max(32, 'Tag is too long')
    .regex(/^$|^[a-z0-9-_]+$/, 'Tag must be lowercase and contain only letters, numbers, hyphens or underscores')
  });
  