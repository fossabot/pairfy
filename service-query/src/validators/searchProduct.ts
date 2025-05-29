import { z } from "zod";

const MAX_STRING_LENGTH = 64;

const ConditionEnum = z.enum(["new", "used", "refurbished"]);

export const ProductSearchFiltersSchema = z
  .object({
    sku: z.string().trim().max(MAX_STRING_LENGTH, "SKU is too long").optional(),

    priceMin: z
      .number()
      .int()
      .nonnegative()
      .max(1_000_000, "Minimum price is too high")
      .optional(),

    priceMax: z
      .number()
      .int()
      .nonnegative()
      .max(1_000_000, "Maximum price is too high")
      .optional(),

    category: z
      .string()
      .trim()
      .max(MAX_STRING_LENGTH, "Category is too long")
      .optional(),

    brand: z
      .string()
      .trim()
      .max(MAX_STRING_LENGTH, "Brand is too long")
      .optional(),

    model: z
      .string()
      .trim()
      .max(MAX_STRING_LENGTH, "Model is too long")
      .optional(),

    condition: ConditionEnum.optional(),

    discountPercentMin: z
      .number()
      .min(0, "Minimum discount must be at least 0%")
      .max(100, "Minimum discount cannot exceed 100%")
      .optional(),
  })
  .strict();

export type ProductSearchFilters = z.infer<typeof ProductSearchFiltersSchema>;

export const validateParams = z.object({
  prompt: z
    .string({
      required_error: "Search text is required",
    })
    .min(1, "Search text is required")
    .max(300, "Search text too long"),
  vectorized: z.boolean(),
  filters: ProductSearchFiltersSchema.optional().default({})
});
