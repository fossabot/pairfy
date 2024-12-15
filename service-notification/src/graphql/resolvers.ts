import { database } from "../db/client.js";
import { updateBook } from "./books/index.js";

const getOrders = async (_: any, args: any, context: any) => {
  const params = args.updateProductInput;

  console.log(params);

  const SELLER = context.sellerData;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    await connection.beginTransaction();

    await connection.commit();

    return { success: true };
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

////////////////////////////////////////////////////////////////

const books = {
  Mutation: {
    updateBook,
  },
};

////////////////////////////////////////////////////////////////

const orders = {
  Query: {
    getOrders,
  },
};

export { books, orders };
