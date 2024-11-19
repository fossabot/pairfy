import { database } from "../../db/client.js";
import { logger } from "../../utils/index.js";

const createProduct = async (message: any, data: any) => {
  let connection = null;

  try {
    connection = await database.client.getConnection();

    const [findProcessed] = await connection.execute(
      "SELECT * FROM processed WHERE id = ? AND processed = ?",
      [data.id, true]
    );

    if (findProcessed.length > 0) {
      return message.ack();
    }

    await connection.beginTransaction();

    const schemeData = `
      INSERT INTO products (
          id,
          seller_id,
          name,
          price,  
          collateral,
          sku,              
          model,
          brand,
          features,
          category,
          keywords,
          stock,
          color,
          color_name,
          quality,
          country,
          media_url,
          image_path,
          video_path,
          image_set,
          video_set,
          discount,
          discount_value,
          schema_v
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await connection.execute(schemeData, JSON.parse(data.payload));

    const processedSchema =
      "INSERT INTO processed (id, event_type, processed) VALUES (?, ?, ?)";

    const processedEvent = [data.id, data.event_type, true];

    await connection.execute(processedSchema, processedEvent);

    await connection.commit();

    message.ack();
  } catch (err: any) {
    logger.error(err);

    await connection.rollback();

    message.nak();
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const handlers: any = {
  CreateProduct: (message: any, payload: any) =>
    createProduct(message, payload),
};

export const processEvent = (message: any) => {
  const messageDecoded = new TextDecoder().decode(message.data);

  const data = JSON.parse(messageDecoded);

  console.log(data.id, data.event_type);

  handlers[data.event_type](message, data);
};
