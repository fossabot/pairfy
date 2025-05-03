import database from "../../database/client.js";

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
      throw new Error("NOT_PRODUCT");
    }

    return product[0];
  } catch (err: any) {
    if (connection) {
      await connection.rollback();
    }

    throw new Error(err.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

