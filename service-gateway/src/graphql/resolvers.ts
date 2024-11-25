import { getProductId, logger } from "../utils/index.js";
import { database } from "../db/client.js";

const getOrders = async (args: any, context: any) => {
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
    await connection.rollback();

    throw new Error(err.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getProducts = async (args: any, context: any) => {
  const params = args.getProductsInput;

  const SELLER = context.sellerData;

  const pageSize = 16;

  const defaultCursor = "NOT";

  let connection = null;

  let queryScheme = `
    SELECT
      p.id AS id,
      p.name AS name,
      p.price AS price,
      p.collateral AS collateral,
      p.media_url AS media_url,
      p.image_path  AS image_path,
      p.image_set  AS image_set,
      p.created_at AS created_at,
      b.product_stock AS book_product_stock,
      b.ready_stock AS book_ready_stock,
      b.blocked_orders AS book_blocked_orders
    FROM
      products p
    JOIN
      books b
    ON
      p.id = b.id    
    WHERE
      p.seller_id = ?`;

  let queryParams: any = [SELLER.id];

  if (params.cursor !== defaultCursor) {
    queryScheme += " AND p.created_at < ?";

    const date = new Date(parseInt(params.cursor)).toISOString();

    queryParams.push(date);
  }

  queryScheme += " ORDER BY p.created_at DESC LIMIT ?";

  queryParams.push(pageSize);

  try {
    connection = await database.client.getConnection();

    const [products] = await connection.query(queryScheme, queryParams);

    const [productCount] = await connection.execute(
      `SELECT COUNT(*) AS total_products FROM products WHERE seller_id = ?`,
      [SELLER.id]
    );

    const cursor = products.length
      ? products[products.length - 1].created_at
      : params.cursor;

    const count = productCount[0].total_products;

    return {
      products,
      cursor,
      count,
    };
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

const products = {
  Query: {
    getOrders: (_: any, args: any, context: any) => getOrders(args, context),
    getProducts: (_: any, args: any, context: any) =>
      getProducts(args, context),
  },
};

export { products };
