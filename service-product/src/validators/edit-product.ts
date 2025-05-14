import { z } from "zod";
import {
  productBrandSchema,
  productBulletlistSchema,
  productCategorySchema,
  productCitySchema,
  productColorSchema,
  productConditionSchema,
  productDiscountPercentSchema,
  productDiscountSchema,
  productFileIds,
  productMediaGroupIdSchema,
  productModelSchema,
  productNameSchema,
  productOriginSchema,
  productPostalSchema,
  productPriceSchema,
  productSkuSchema,
} from "./index.js";
import { TiptapDocumentSchema, productIdSchema } from "@pairfy/common";

export const verifyParams = z.object({
  id: productIdSchema,
  name: productNameSchema,
  price: productPriceSchema,
  sku: productSkuSchema,
  model: productModelSchema,
  brand: productBrandSchema,
  description: TiptapDocumentSchema,
  category: productCategorySchema,
  bullet_list: productBulletlistSchema,
  color: productColorSchema,
  condition_: productConditionSchema,
  origin: productOriginSchema,
  city: productCitySchema,
  postal: productPostalSchema,
  discount: productDiscountSchema,
  discount_percent: productDiscountPercentSchema,
  media_group_id: productMediaGroupIdSchema,
  file_ids: productFileIds
});
