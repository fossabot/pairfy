import { getProductId } from "@pairfy/common";
import database from "../../database/client.js";

export const createProduct = async (_: any, args: any, context: any) => {
  const params = args.createProductInput;

  console.log(params);

  //////////////////// INPUT VALIDATION

  const SELLER = context.sellerData;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    await connection.beginTransaction();

    ///////////////////////////////////////////////////////////////////////

    const timestamp = Date.now();

    const productId = getProductId();

    const groupId = productId;

    const mediaId = productId;

    const productSKU = params.sku + `:${SELLER.id}`;

    const productScheme = {
      id: productId,
      group_id: groupId,
      media_group_id: mediaId,
      seller_id: SELLER.id,
      name: params.name,
      price: params.price,
      sku: productSKU,
      model: params.model,
      brand: params.brand,
      description: params.description,
      category: params.category,
      bullet_list: params.bullet_list,
      color: params.color,
      condition_: params.condition_,
      country: SELLER.country,
      origin: params.origin,
      city: params.city,
      postal: params.postal,
      discount: params.discount,
      discount_value: params.discount_value,
      created_at: timestamp,
      updated_at: timestamp,
      schema_v: 0,
    };

    const columns = Object.keys(productScheme);

    const values = Object.values(productScheme);

    const createScheme = `
        INSERT INTO products (${columns.join(", ")})
        VALUES (${columns.map(() => "?").join(", ")})
      `;

    const [created] = await connection.execute(createScheme, values);

    if (created.affectedRows !== 1) {
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

    const PRODUCT = products[0]; /////////////////////////////////////

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
      "CreateProduct",
      JSON.stringify(PRODUCT),
      SELLER.id,
      0,
    ];

    await connection.execute(eventSchema, eventValue);

    ///////////////////////////////////////////////////////////////////////

    await connection.commit();

    return { success: true };
  } catch (err: any) {
    if (connection) {
      await connection.rollback();
    }

    throw err;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
