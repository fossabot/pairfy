import { getProductId } from "../utils/index.js";
import { database } from "../db/client.js";

const createProduct = async (_: any, args: any, context: any) => {
  const params = args.createProductInput;

  console.log(params);

  const SELLER = context.sellerData;

  if (params.collateral >= params.price) {
    throw new Error("MAX_COLLATERAL");
  }

  let connection = null;

  try {
    connection = await database.client.getConnection();

    await connection.beginTransaction();

    const productId = getProductId();

    const productVersion = 0;

    const productSKU = params.sku + `:${SELLER.id}`;

    const productData = {
      id: productId,
      seller_id: SELLER.id,
      name: params.name,
      price: params.price,
      collateral: params.collateral,
      sku: productSKU,
      model: params.model,
      brand: params.brand,
      features: params.features,
      category: params.category,
      keywords: params.keywords,
      bullet_list: params.bullet_list,
      paused: params.paused,
      color: params.color,
      color_name: params.color_name,
      quality: params.quality,
      country: SELLER.country,
      media_url: "https://pairfy.dev",
      image_path: "/api/media/get-image/",
      video_path: "/api/media/get-video/",
      image_set: params.image_set,
      video_set: params.video_set,
      discount: params.discount,
      discount_value: params.discount_value,
      schema_v: productVersion,
    };
    
    const columns = Object.keys(productData);

    const values = Object.values(productData);

    const schemeData = `
      INSERT INTO products (${columns.join(", ")})
      VALUES (${columns.map(() => "?").join(", ")})
    `;

    await connection.execute(schemeData, values);

    //Create Event

    const eventId = productId + "-" + productVersion;

    const eventSchema = `
        INSERT INTO events (
        id,
        event_type,
        payload,
        agent_id,
        event_version
        ) VALUES (?, ?, ?, ?, ?)
        `;

    const eventValue = [
      eventId,
      "CreateProduct",
      JSON.stringify(productData),
      SELLER.id,
      0
    ];

    await connection.execute(eventSchema, eventValue);

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


const getProduct = async (_: any, args: any, context: any) => {
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

const deleteProduct = async (_: any, args: any, context: any) => {
  const params = args.deleteProductInput;

  console.log(params);

  const SELLER = context.sellerData;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    await connection.beginTransaction();

    const schemeData = "DELETE FROM products WHERE id = ? AND seller_id = ?";

    const schemeValue = [params.id, SELLER.id];

    const [result] = await connection.execute(schemeData, schemeValue);

    if (result.affectedRows !== 1) {
      throw new Error("INTERNAL_ERROR");
    }

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

const products = {
  Query: {
    getProduct,
  },
  Mutation: {
    createProduct,
  },
};

export { products };
