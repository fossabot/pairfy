import { z } from "zod";


const productNameRegex = /^[\p{L}\p{N} .,'"\-():+]+$/u;
const productPriceRegex = /^[0-9]*$/;
const skuRegex = /^[A-Z0-9-]+$/;
const modelRegex = /^[a-zA-Z0-9\- ]*$/;
const brandRegex = /^[\p{L}\p{N}\s\-.,&()']+$/u;

export const createProductSchema = z.object({
  name: z.string().min(3).max(200).regex(productNameRegex, "Invalid product name"),
  price: z.number().int().min(5).max(999_999).nonnegative().refine((val) => productPriceRegex.test(val.toString()), {
    message: "Invalid price format",
  }),
  sku: z.string().min(1).max(20).regex(skuRegex, "Invalid SKU format"),
  model: z.string().min(1).regex(modelRegex, "Invalid model format"),
  brand: z.string().min(1).regex(brandRegex, "Invalid brand format"),
  description: z.string().min(1),
  category: z.string().min(1),
  bullet_list: z.array(z.string().min(1)).min(1),
  color: z.string().min(1),
  condition_: z.string().min(1),
  country: z.string().min(1),
  origin: z.string().min(1),
  city: z.string().min(1),
  postal: z.string().min(1),
  discount: z.boolean(),
  discount_value: z.number().int().nonnegative(),
});
