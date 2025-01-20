import { database } from "../../database/client.js";

const getProductPage = async (_: any, args: any, context: any) => {
  const params = args.getProductInput;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const [product] = await connection.execute(
      "SELECT * FROM products WHERE id = ?",
      [params.id]
    );

    if (!product.length) {
      throw new Error("NO_PRODUCT");
    }

    const scheme = {
      success: true,
      payload: "test"
    }

    return scheme
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


export { getProductPage }