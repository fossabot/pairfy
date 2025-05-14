import database from "../../database/client.js";
import {
  ApiGraphQLError,
  createEvent,
  ERROR_CODES,
  findProductById,
  findProductBySeller,
  sanitizeArrayGraphQL,
  sanitizeTiptapContent,
  SellerToken,
  updateProduct,
} from "@pairfy/common";
import { verifyParams } from "../../validators/edit-product.js";

export const editProduct = async (_: any, args: any, context: any) => {

  let connection = null;

  try {
    args.editProductInput.bullet_list = sanitizeArrayGraphQL(
      args.editProductInput.bullet_list
    );

    const validateParams = verifyParams.safeParse(args.editProductInput);

    if (!validateParams.success) {
      const errors = JSON.stringify(validateParams.error.flatten());
      throw new ApiGraphQLError(400, `Validation failed: ${errors}`, {
        code: ERROR_CODES.VALIDATION_ERROR,
      });
    }

    args.editProductInput.description = sanitizeTiptapContent(
      args.editProductInput.description
    );

    ////////////////////////////////////////////////////////////////////////////////

    connection = await database.client.getConnection();

    const params = validateParams.data;

    const SELLER = context.sellerData as SellerToken;

    const timestamp = Date.now();

    const findProduct = await findProductBySeller(
      connection,
      params.id,
      SELLER.id
    );

    if (!findProduct) {
      throw new ApiGraphQLError(404, "The product does not exist", {
        code: ERROR_CODES.NOT_FOUND,
      });
    }

    await connection.beginTransaction();

    /////////////////////////////////////////////////////////////////////////////////////

    const updateScheme: any = {
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
      origin: params.origin,
      city: params.city,
      postal: params.postal,
      discount: params.discount,
      discount_percent: params.discount_percent,
      schema_v: findProduct.schema_v + 1,
    };

    console.log(updateScheme);

    const update = await updateProduct(
      connection,
      findProduct.id,
      findProduct.schema_v,
      updateScheme
    );

    if (update.affectedRows !== 1) {
      throw new ApiGraphQLError(409, "Update failed: version mismatch or not found", {
        code: ERROR_CODES.UPDATE_CONFLICT,
      });
    }

    const updatedProduct = await findProductById(connection, findProduct.id);

    await createEvent(
      connection,
      timestamp,
      "service-product",
      "UpdateProduct",
      JSON.stringify(updatedProduct),
      SELLER.id
    );

    /////////////////////////////////////////////////////////////////////////////////////

    await connection.commit();

    return { success: true, message: "The product was updated successfully!" };
  } catch (error: any) {
    if (connection) await connection.rollback();

    throw error;
  } finally {
    if (connection) connection.release();
  }
};
