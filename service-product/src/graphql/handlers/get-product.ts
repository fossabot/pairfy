import database from "../../database/client.js";
import { ApiGraphQLError, ERROR_CODES } from "@pairfy/common";
import { sortMediaByPosition } from "../../utils/media.js";

export const getProduct = async (_: any, args: any, context: any) => {
  const params = args.getProductInput;

  console.log(params);

  const SELLER = context.sellerData;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const [products] = await connection.execute(
      `SELECT * FROM products WHERE id = ? AND seller_id = ? LIMIT 1`,
      [params.id, SELLER.id]
    );

    if (!products.length) {
      throw new ApiGraphQLError(404, "Product not found", {
        code: ERROR_CODES.NOT_FOUND,
      });
    }

    const product = products[0];

    const [media] = await connection.execute(
      `SELECT * FROM media WHERE product_id = ?`,
      [product.id]
    );

    const response = {
      product,
      media: sortMediaByPosition(product.media_position, media),
    };

    return response;
  } catch (error: any) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
