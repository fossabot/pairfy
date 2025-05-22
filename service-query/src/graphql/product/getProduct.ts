import { database } from "../../database/client.js";
import {
  ApiGraphQLError,
  ERROR_CODES,
  findMediasByProductId,
  sortMediaByPosition,
  findProductById,
} from "@pairfy/common";

export const getProduct = async (_: any, args: any, context: any) => {
  const params = args.getProductInput;

  console.log(params);

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const findProduct = await findProductById(connection, params.id);

    if (!findProduct) {
      throw new ApiGraphQLError(404, "Product not found", {
        code: ERROR_CODES.NOT_FOUND,
      });
    }

    const product = findProduct;

    const findMedia = await findMediasByProductId(connection, product.id);

    const response = {
      product,
      media:  findMedia.length ? sortMediaByPosition(product.media_position, findMedia) : []
    };

    return response;
  } catch (error: any) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
