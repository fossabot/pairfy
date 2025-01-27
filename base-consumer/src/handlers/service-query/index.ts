import { database } from "../../database/client.js";
import { logger } from "../../utils/index.js";
import { Client } from "@elastic/elasticsearch";

const searchClient = new Client({
  node: process.env.ELASTIC_NODE as string,
  auth: {
    apiKey: process.env.ELASTIC_KEY as string,
  },
});

const createProductIndex = async (data: any) => {
  let result = false;

  try {
    const exists = await searchClient.exists({
      index: "products",
      id: data.id,
    });

    if (exists) {
      result = true;
    } else {
      const images = data.image_set.split(",");

      const productImage = data.media_url + data.image_path + images[0];

      const document = {
        id: data.id,
        name: data.name,
        sku: data.sku,
        category: data.category,
        brand: data.brand,
        model: data.model,
        price: data.price,
        quality: data.quality,
        image: productImage,
        keywords: data.keywords,
        rating: 0.0,
        reviews: 0,
        discount: data.discount,
        discount_value: data.discount_value,
        best_seller: false,
      };

      console.log(document);

      const response = await searchClient.index({
        index: "products",
        id: document.id,
        document,
      });

      if (response.result !== "created") {
        throw new Error("createProductIndexError");
      }

      result = true;
    }
  } catch (err) {
    logger.error(err);
  } finally {
    return result;
  }
};

const CreateProduct = async (event: any, seq: number): Promise<boolean> => {
  let response = null;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const [findProcessed] = await connection.execute(
      "SELECT id FROM processed WHERE id = ? AND processed = ?",
      [event.id, true]
    );

    if (findProcessed.length > 0) {
      console.log("CreateProductRepeated");

      return Promise.resolve(true);
    }

    const payload = JSON.parse(event.data);

    /////////////////////////////////////////////////

    await connection.beginTransaction();

    const columns = Object.keys(payload);

    const values = Object.values(payload);

    const schemeData = `
      INSERT INTO products (${columns.join(", ")})
      VALUES (${columns.map(() => "?").join(", ")})
    `;

    await connection.execute(schemeData, values);

    await connection.execute(
      "INSERT INTO processed (id, seq, type, processed) VALUES (?, ?, ?, ?)",
      [event.id, seq, event.type, true]
    );

    const elastic = await createProductIndex(payload);

    if (!elastic) {
      throw new Error("CreateProductElastic");
    }

    await connection.commit();

    /////////////////////////////////////////////////

    response = Promise.resolve(true);
  } catch (err: any) {
    logger.error(err);

    if (connection) {
      await connection.rollback();
    }

    response = Promise.resolve(false);
  } finally {
    if (connection) {
      await connection.release();
    }
  }

  return response;
};

const handlers: any = {
  CreateProduct,
};

export const processEvent = (message: any) => {
  const messageDecoded = new TextDecoder().decode(message.data);

  const event = JSON.parse(messageDecoded);

  console.log(message.seq, event.id, event.type);

  return handlers[event.type](event, message.seq);
};
