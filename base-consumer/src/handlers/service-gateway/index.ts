import { database } from "../../db/client.js";
import { logger } from "../../utils/index.js";

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
      console.log("-------repeated--------");

      return Promise.resolve(true);
    }

    const payload = JSON.parse(event.payload);

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
            bullet_list,
            paused,
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
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


    await connection.execute(schemeData, payload);

    await connection.execute(
      "INSERT INTO books (id, seller_id, product_sku) VALUES (?, ?, ?)",
      [payload[0], payload[1], payload[5]]
    );

    await connection.execute(
      "INSERT INTO processed (id, seq, event_type, processed) VALUES (?, ?, ?, ?)",
      [event.id, seq, event.event_type, true]
    );

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
  CreateProduct,
};

export const processEvent = (message: any) => {
  const messageDecoded = new TextDecoder().decode(message.data);

  const event = JSON.parse(messageDecoded);

  console.log(message.seq, event.id, event.event_type);

  return handlers[event.event_type](event, message.seq);
};
