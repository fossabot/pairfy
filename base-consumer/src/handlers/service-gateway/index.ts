import { database } from "../../db/client.js";
import { logger } from "../../utils/index.js";

const createProductHandler = async (data: any): Promise<boolean> => {
  let response = null;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    await connection.beginTransaction();

    const schemeData = `
      INSERT IGNORE INTO products (
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
      "INSERT IGNORE INTO processed (id, event_type, processed) VALUES (?, ?, ?)";

    const processedEvent = [data.id, data.event_type, true];

    await connection.execute(processedSchema, processedEvent);

    await connection.commit();

    const [findProcessed] = await connection.execute(
      "SELECT * FROM processed WHERE id = ?",
      [data.id]
    );

    if (findProcessed.length < 1) {
      throw new Error("ACK_ERROR");
    }

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
  CreateProduct: (payload: any) =>
    createProductHandler(payload),
};

export const processEvent = (message: any) => {
  const messageDecoded = new TextDecoder().decode(message.data);

  const data = JSON.parse(messageDecoded);

  console.log(data.id, data.event_type);

  return handlers[data.event_type](data);
};
