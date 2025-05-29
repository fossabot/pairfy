import { z } from "zod";
import { categoryCodes, extractTextFromHTML, ISOCountries } from "../utils/index.js";

export const productNameRegex = /^[\p{L}\p{N} .,'"\-(/&|＆):+]+$/u;
export const productPriceRegex = /^[0-9]*$/;
export const skuRegex = /^[A-Z0-9-]+$/;
export const modelRegex = /^[a-zA-Z0-9\- ]*$/;
export const brandRegex = /^[\p{L}\p{N}\s\-.,&()']+$/u;
export const cityRegex = /^[\p{L}\p{M}\s\-'.(),]+$/u;
export const postalRegex = /^[\p{L}\p{N}\s\-]+$/u;
export const bulletRegex = /^[\p{L}\p{N}\p{P}\p{S}\p{Zs}\n]{1,240}$/u;

export const productNameSchema = z
  .string()
  .min(3)
  .max(200)
  .regex(productNameRegex, "Invalid product name");

export const productPriceSchema = z
  .number()
  .int()
  .min(5)
  .max(999_999)
  .nonnegative()
  .refine((val) => productPriceRegex.test(val.toString()), {
    message: "Invalid price format",
  });

export const productSkuSchema = z
  .string()
  .min(1)
  .max(20)
  .regex(skuRegex, "Invalid SKU format");

export const productModelSchema = z
  .string()
  .min(1)
  .max(40)
  .regex(modelRegex, "Invalid model format");

export const productBrandSchema = z
  .string()
  .min(1)
  .max(40)
  .regex(brandRegex, "Invalid brand format");

export const productCategorySchema = z
  .string()
  .min(1)
  .refine((val) => categoryCodes.includes(val), {
    message: "Invalid category code",
  });

export const productBulletlistSchema = z
  .array(
    z.string().refine(
      (val) => {
        if (val === "") return true;
        if (val.length === 0) return false;
        if (val.length > 240) return false;
        return bulletRegex.test(val);
      },
      {
        message:
          "Each feature must be empty or a valid string up to 240 chars with allowed characters.",
      }
    )
  )
  .min(1, { message: "At least one feature is required." })
  .max(4, { message: "No more than 4 features are allowed." });

export const productColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
  message: "Invalid hex color format.",
});

export const productConditionSchema = z.enum(["new", "used", "refurbished"]);

export const productOriginSchema = z
  .string()
  .length(2)
  .refine((val) => ISOCountries.includes(val), {
    message: "Invalid origin country code",
  });

export const productCitySchema = z
  .string()
  .min(1)
  .max(40)
  .regex(cityRegex, "Invalid city format");

export const productPostalSchema = z
  .string()
  .min(1)
  .max(12)
  .regex(postalRegex, "Invalid postal format");

export const productDiscountSchema = z.boolean();

export const productDiscountPercentSchema = z
  .number()
  .int()
  .nonnegative()
  .min(0)
  .max(100);

export const productMediaGroupIdSchema = z
  .string()
  .regex(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/, {
    message: "Invalid media group ID format",
  });

export const productFileIds = z
  .array(z.string().min(1).max(100))
  .min(1)
  .max(11);

export const tiptapContentSchema = z
  .string()
  .trim()
  .min(1, { message: "Content cannot be empty." })
  .max(100_000, { message: "Content cannot exceed 100,000 characters." })
  .regex(/<[^>]+>/, {
    message: "Content must contain at least one valid HTML tag.",
  })
  .refine((val) => extractTextFromHTML(val).length <= 6000, {
    message: "Plain text content cannot exceed 6,000 characters.",
  });
