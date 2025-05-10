import database from "../../database/client.js";
import { ApiGraphQLError, ERROR_CODES } from "@pairfy/common";


export const getProduct = async (_: any, args: any, context: any) => {
  const params = args.getProductInput;

  console.log(params);

  const SELLER = context.sellerData;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const [product] = await connection.execute(
      `SELECT * FROM products WHERE id = ? AND seller_id = ?`,
      [params.id, SELLER.id]
    );

    if (!product.length) {
      throw new ApiGraphQLError(404, "Product not found", {
        code: ERROR_CODES.NOT_FOUND
      })
    }

    return product[0];

  } catch (error: any) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
