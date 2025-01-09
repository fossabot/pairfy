import { database } from "../database/client.js";
import { getBooks, updateBook } from "./books/index.js";
import { createOrder } from "./orders/pending.js";
import { getOrder } from "./orders/get-order.js";
import { lockingFunds } from "./orders/locking.js";
import { returnFunds } from "./orders/return.js";
import { dispatchProduct } from "./orders/shipping.js";

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

const products = {
  Query: {
    getOrders,
  },
};

////////////////////////////////////////////////////////////////

const books = {
  Query: {
    getBooks,
  },
  Mutation: {
    updateBook,
  },
};

////////////////////////////////////////////////////////////////

const orders = {
  Query: {
    getOrder,
  },
  Mutation: {
    createOrder,
    returnFunds,
    lockingFunds,
    dispatchProduct
  },
};

export { products, books, orders };
