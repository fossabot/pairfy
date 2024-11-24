import { database } from "../../db/client.js";
import { logger } from "../../utils/index.js";

const createProductHandler = async (
  data: any,
  seq: number
): Promise<boolean> => {
  let response = null;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const [findProcessed] = await connection.execute(
      "SELECT id FROM processed WHERE id = ? AND processed = ?",
      [data.id, true]
    );

    if (findProcessed.length > 0) {
      console.log("-------repeated--------");

      return Promise.resolve(true);
    }

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
      "INSERT INTO processed (id, seq, event_type, processed) VALUES (?, ?, ?, ?)";

    const processedEvent = [data.id, seq, data.event_type, true];

    await connection.execute(processedSchema, processedEvent);

    await connection.commit();

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
  CreateProduct: (payload: any, seq: number) =>
    createProductHandler(payload, seq),
};

export const processEvent = (message: any) => {
  const messageDecoded = new TextDecoder().decode(message.data);

  const data = JSON.parse(messageDecoded);

  console.log(message.seq, data.id, data.event_type);

  return handlers[data.event_type](data, message.seq);
};
