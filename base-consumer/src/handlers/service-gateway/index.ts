import { database } from "../../db/client.js";
import { logger } from "../../utils/index.js";

const createProductHandler = async (message: any, data: any) => {
  let connection = null;

  try {
    connection = await database.client.getConnection();

    const [findProcessed] = await connection.execute(
      "SELECT * FROM processed WHERE id = ?",
      [data.id]
    );

    if (findProcessed.length > 0) {
      console.log("-----------repeated-------------");
      return message.ack();
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
      "INSERT IGNORE INTO processed (id, event_type, processed) VALUES (?, ?, ?)";

    const processedEvent = [data.id, data.event_type, true];

    await connection.execute(processedSchema, processedEvent);

    await connection.commit();

    const isAck = await message.ackAck();

    console.log(isAck);

    if (!isAck) {
      throw new Error("ACK_ERROR");
    }

  } catch (err: any) {
    message.nak();

    logger.error(err);

    if (connection) {
      await connection.rollback();
    }
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const handlers: any = {
  CreateProduct: async (message: any, payload: any) =>
    await createProductHandler(message, payload),
};

export const processEvent = async (message: any) => {
  const messageDecoded = new TextDecoder().decode(message.data);

  const data = JSON.parse(messageDecoded);

  console.log(data.id, data.event_type);

  await handlers[data.event_type](message, data);
};
