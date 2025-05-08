import database from "../../database/client.js";
import {
  ApiGraphQLError,
  ERROR_CODES,
  getProductId,
  insertProduct,
  findProductById,
  findProductBySku,
  createEvent,
  sanitizeTiptapContent,
  sanitizeArrayGraphQL,
} from "@pairfy/common";
import { verifyParams } from "../../validators/create-product.js";
import { checkFileGroup } from "../../utils/verify-group.js";

export const createProduct = async (_: any, args: any, context: any) => {
  let connection = null;

  try {
    args.createProductInput.bullet_list = sanitizeArrayGraphQL(
      args.createProductInput.bullet_list
    );

    const validateParams = verifyParams.safeParse(
      args.createProductInput
    );

    if (!validateParams.success) {
      const errors = JSON.stringify(validateParams.error.flatten());
      throw new ApiGraphQLError(400, `Validation failed: ${errors}`, {
        code: ERROR_CODES.VALIDATION_ERROR,
      });
    }

    args.createProductInput.description = sanitizeTiptapContent(
      args.createProductInput.description
    );

    ///////////////////////////////////////////////////////////////////////////////////////////

    connection = await database.client.getConnection();

    const params = validateParams.data;

    const SELLER = context.sellerData;

    const timestamp = Date.now();

    const productId = getProductId();

    const productGroupId = productId;

    ///////////////////////////////////////////////////////////////////////////////////////////

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

    const isValidGroup = await checkFileGroup(
      "http://service-media.default.svc.cluster.local:8003/api/media/verify-group",
      {
        agent_id: SELLER.id,
        media_group_id: params.media_group_id,
        file_ids: params.file_ids,
        product_id: productId,
        thumbnail_id: params.file_ids[0]
      },
      "fakesecret" ////
    );

    if (!isValidGroup) {
      throw new ApiGraphQLError(409, "Inconsistency of image ids.", {
        code: ERROR_CODES.CONFLICT,
      });
    }

    const productScheme = {
      id: productId,
      group_id: productGroupId,
      media_group_id: params.media_group_id,
      media_position: params.file_ids,
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
      discount_value: 0, ///////////////
      discount_percent: params.discount_percent,
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
      message: `Your product was created successfully! You can now view or edit its details using ID: ${findProduct.id}`,
      data: {
        product_id: findProduct.id,
      },
    };
  } catch (err: any) {
    if (connection) await connection.rollback();

    throw err;
  } finally {
    if (connection) connection.release();
  }
};
