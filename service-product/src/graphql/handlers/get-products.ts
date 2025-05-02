import database from "../../database/client.js";

export const getProducts = async (_: any, args: any, context: any) => {
  const { cursor } = args.getProductsInput;
  const { sellerData: SELLER } = context;

  const pageSize = 16;
  const realLimit = pageSize + 1;

  let connection = null;

  let query = "SELECT * FROM products WHERE seller_id = ?";
  const queryParams: any[] = [SELLER.id];

  if (cursor !== "NOT") {
    const timestamp = Number(cursor);
    if (isNaN(timestamp)) {
      throw new Error("Invalid cursor");
    }
    query += " AND created_at < ?";
    queryParams.push(new Date(timestamp).toISOString());
  }

  query += " ORDER BY created_at DESC LIMIT ?";
  queryParams.push(realLimit);

  try {
    connection = await database.client.getConnection();

    const [products] = await connection.query(query, queryParams);

    const hasMore = products.length > pageSize;
    const trimmedProducts = hasMore ? products.slice(0, pageSize) : products;

    const nextCursor = hasMore
      ? trimmedProducts[trimmedProducts.length - 1].created_at
      : null;

    const [[{ total_products }]] = await connection.query(
      "SELECT COUNT(*) AS total_products FROM products WHERE seller_id = ?",
      [SELLER.id]
    );

    return {
      products: trimmedProducts,
      nextCursor,
      hasMore,
      totalCount: total_products,
    };
  } catch (err: any) {
    throw new Error(err.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
