import { redisClient } from "../database/redis.js";
import { database } from "../database/client.js";
import { getProductPage } from "./product/page.js";

const getProduct = async (_: any, args: any, context: any) => {
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

const getAssetPrice = async () => {
  try {
    const getPrice = await redisClient.client.get("price:ADAUSDT");

    if (!getPrice) {
      throw new Error("NO_PRICE");
    }

    return parseFloat(getPrice);
  } catch (err: any) {
    throw new Error(err.message);
  } 
};

const products = {
  Query: {
    getProduct,
    getProductPage
  },
};

const assets = {
  Query: {
    getAssetPrice,
  },
};

export { products, assets };
