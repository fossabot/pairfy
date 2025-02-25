import { formatProduct, getCurrentTimestamp } from "../../utils/index.js";
import { database } from "../../database/client.js";

export const updateProduct = async (_: any, args: any, context: any) => {
  const params = args.updateProductInput;

  console.log(params);

  const SELLER = context.sellerData;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    await connection.beginTransaction();

    const productData: any = {};

    const productId: string = params.id;

    for (const key in params) {
      productData[key] = params[key];
    }

    delete productData["id"];

    productData["updated_at"] = getCurrentTimestamp();

    const fields = Object.keys(productData)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = [...Object.values(productData), productId, SELLER.id];

    const updateScheme = `
        UPDATE products
        SET ${fields}, schema_v = schema_v + 1
        WHERE id = ? AND seller_id = ?
        `;

    console.log(values);

    console.log(updateScheme);

    const [updated] = await connection.execute(updateScheme, values);

    if (updated.affectedRows !== 1) {
      throw new Error("INTERNAL_ERROR");
    }

    //////////////////////////////////////////////////////////////

    const [products] = await connection.execute(
      `SELECT * FROM products WHERE id = ?`,
      [productId]
    );

    if (products.length === 0) {
      throw new Error("INTERNAL_ERROR");
    }

    const PRODUCT = formatProduct(products[0]);

    const eventId = PRODUCT.id + "-" + PRODUCT.schema_v;

    const eventSchema = `
          INSERT INTO events (
          id,
          source,
          type,
          data,
          agent_id,
          spec_version
          ) VALUES (?, ?, ?, ?, ?, ?)
          `;

    const eventValue = [
      eventId,
      "service-product",
      "UpdateProduct",
      JSON.stringify(PRODUCT),
      SELLER.id,
      0,
    ];

    await connection.execute(eventSchema, eventValue);

    //////////////////////////////////////////////////////////////

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
