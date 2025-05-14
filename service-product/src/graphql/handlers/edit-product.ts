import database from "../../database/client.js";
import {
  ApiError,
  createEvent,
  ERROR_CODES,
  findProductById,
  findProductBySeller,
  SellerToken,
  updateProduct,
} from "@pairfy/common";

export const editProduct = async (_: any, args: any, context: any) => {
  const params = args.editProductInput;

  console.log(params);

  const SELLER = context.sellerData as SellerToken;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const findProduct = await findProductBySeller(
      connection,
      params.id,
      SELLER.id
    );

    if (!findProduct) {
      throw new ApiError(404, "The product does not exist", {
        code: ERROR_CODES.NOT_FOUND,
      });
    }

    await connection.beginTransaction();

    /////////////////////////////////////////////////////////////////////////////////////

    const timestamp = Date.now();

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
      media_group_id: params.media_group_id,
      file_ids: params.file_ids,
      schema_v: findProduct.schema_v + 1
    };

    console.log(updateScheme);

    const update = await updateProduct(
      connection,
      findProduct.id,
      findProduct.schema_v,
      updateScheme
    );

    if (update.affectedRows !== 1) {
      throw new ApiError(409, "Update failed: version mismatch or not found", {
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
