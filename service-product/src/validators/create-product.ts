import { z } from "zod";
import { ISOCountries } from "../utils";
import { TiptapDocumentSchema } from "@pairfy/common";

const productNameRegex = /^[\p{L}\p{N} .,'"\-(/&|＆):+]+$/u;
const productPriceRegex = /^[0-9]*$/;
const skuRegex = /^[A-Z0-9-]+$/;
const modelRegex = /^[a-zA-Z0-9\- ]*$/;
const brandRegex = /^[\p{L}\p{N}\s\-.,&()']+$/u;
const cityRegex = /^[\p{L}\p{M}\s\-'.(),]+$/u;
const postalRegex = /^[\p{L}\p{N}\s\-]+$/u;
const bulletRegex = /^[\p{L}\p{N}\p{P}\p{S}\p{Zs}]{1,240}$/u;

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(200)
    .regex(productNameRegex, "Invalid product name"),
  price: z
    .number()
    .int()
    .min(5)
    .max(999_999)
    .nonnegative()
    .refine((val) => productPriceRegex.test(val.toString()), {
      message: "Invalid price format",
    }),
  sku: z.string().min(1).max(20).regex(skuRegex, "Invalid SKU format"),
  model: z.string().min(1).max(40).regex(modelRegex, "Invalid model format"),
  brand: z.string().min(1).max(40).regex(brandRegex, "Invalid brand format"),
  description: TiptapDocumentSchema,
  category: z.string().min(1),
  bullet_list: z
    .array(
      z
        .string()
        .min(1, { message: "Each feature must not be empty." })
        .max(240, { message: "Each feature must be at most 240 characters." })
        .regex(bulletRegex, {
          message: "Each feature contains invalid characters.",
        })
    )
    .min(1, { message: "At least one feature is required." }),
  color: z.string().min(1),
  condition_: z.string().min(1),
  origin: z
    .string()
    .length(2)
    .refine((val) => ISOCountries.includes(val), {
      message: "Invalid origin country code",
    }),
  city: z.string().min(1).max(40).regex(cityRegex, "Invalid city format"),
  postal: z.string().min(1).max(12).regex(postalRegex, "Invalid postal format"),
  discount: z.boolean(),
  discount_value: z.number().int().nonnegative(),
});



