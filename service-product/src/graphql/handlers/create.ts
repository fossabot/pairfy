import {
  ApiGraphQLError,
  ERROR_CODES,
  getProductId,
  insertProduct,
  findProductById,
  createEvent,
} from "@pairfy/common";
import database from "../../database/client.js";

export const createProduct = async (_: any, args: any, context: any) => {
  const params = args.createProductInput;

  console.log(params);

  //////////////////// INPUT VALIDATION

  const SELLER = context.sellerData;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    await connection.beginTransaction();

    ///////////////////////////////////////////////////////////////////////

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

    //////////////////////////////////////////////////////////////

    const findProduct = await findProductById(connection, productId);

    await createEvent(
      connection,
      timestamp,
      "service-product",
      "CreateProduct",
      JSON.stringify(findProduct),
      SELLER.id
    );

    ///////////////////////////////////////////////////////////////////////

    await connection.commit();

    return {
      success: true,
      data: {
        product_id: findProduct.id
      },
    };
  } catch (err: any) {
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
