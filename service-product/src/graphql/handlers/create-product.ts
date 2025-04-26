import {
  ApiGraphQLError,
  ERROR_CODES,
  getProductId,
  insertProduct,
  findProductById,
  findProductBySku,
  createEvent,
} from "@pairfy/common";
import database from "../../database/client.js";
import { createProductSchema } from "../../validators/create-product.js";

export const createProduct = async (_: any, args: any, context: any) => {
  let connection = null;

  try {
    const validateParams = createProductSchema.safeParse(
      args.createProductInput
    );

    if (!validateParams.success) {
      const errors = JSON.stringify(validateParams.error.flatten());
      throw new ApiGraphQLError(400, `Validation failed: ${errors}`, {
        code: ERROR_CODES.VALIDATION_ERROR,
      });
    }

    const params = validateParams.data;

    console.log(params);

    const SELLER = context.sellerData;

    connection = await database.client.getConnection();

    const isSkuRepeated = await findProductBySku(
      connection,
      SELLER.id,
      params.sku
    );

    if (isSkuRepeated) {
      throw new ApiGraphQLError(409, "Repeated Product Sku", {
        code: ERROR_CODES.RESOURCE_ALREADY_EXISTS,
      });
    }

    await connection.beginTransaction();

    /////////////////////////////////////////////////////////////////////// START TRANSACTION

    const timestamp = Date.now();

    const productId = getProductId();

    const groupId = productId;

    const productScheme = {
      id: productId,
      group_id: groupId,
      seller_id: SELLER.id,
      name: params.name,
      price: params.price,
      sku: params.sku,
      model: params.model,
      brand: params.brand,
      description: params.description,
      category: params.category,
      bullet_list: params.bullet_list,
      color: params.color,
      condition_: params.condition_,
      country: SELLER.country,
      origin: params.origin,
      city: params.city,
      postal: params.postal,
      discount: params.discount,
      discount_value: params.discount_value,
      created_at: timestamp,
      updated_at: timestamp,
      schema_v: 0,
    };

    const [productCreated] = await insertProduct(connection, productScheme);

    if (productCreated.affectedRows !== 1) {
      throw new ApiGraphQLError(
        500,
        "Unexpected error while creating product.",
        {
          code: ERROR_CODES.INTERNAL_ERROR,
        }
      );
    }

    const findProduct = await findProductById(connection, productId);

    await createEvent(
      connection,
      timestamp,
      "service-product",
      "CreateProduct",
      JSON.stringify(findProduct),
      SELLER.id
    );

    /////////////////////////////////////////////////////////////////////// END TRANSACTION

    await connection.commit();

    return {
      success: true,
      message: "Product created successfully.",
      data: {
        product_id: findProduct.id,
      },
    };
  } catch (err: any) {
    console.error(err);

    if (connection) {
      await connection.rollback();
    }

    throw err;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
