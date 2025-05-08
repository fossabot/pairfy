import database from "../../database/client.js";
import { isProcessedEvent, consumedEvent, logger } from "@pairfy/common";
import { insertMedia } from "./insertMedia.js";

const ProcessedFile = async (event: any, seq: number): Promise<boolean> => {
  let response = null;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const processed = await isProcessedEvent(connection, event.id);

    if (processed) {
      logger.error({
        timestamp: new Date().toISOString(),
        service: "service-product-consumer",
        event: "event.repeated",
        message: `event repeated`,
        eventId: event.id,
      });

      return Promise.resolve(true);
    }

    const dataParsed = JSON.parse(event.data);

    await connection.beginTransaction();

    ///////////////////////////////////////////////////////

    const timestamp = Date.now();

    console.log("CreateMedia", dataParsed);

    const { file, urls } = dataParsed;

    const mediaScheme = {
      id: file.id,
      media_group_id: file.media_group_id,
      agent_id: file.agent_id,
      product_id: file.product_id,
      mime_type: file.mime_type,
      position: file.position,
      alt_text: "image",
      resolutions: {
        thumbnail: urls.thumbnail,
        small: urls.small,
        medium: urls.medium,
        large: urls.large
      },
      created_at: timestamp,
      updated_at: timestamp,
      schema_v: 0,
    };
    
    console.log("CreateMedia2", mediaScheme);

    const [mediaCreated] = await insertMedia(connection, mediaScheme);

    if (mediaCreated.affectedRows !== 1) {
      throw new Error("insertMediaError");
    }

    ///////////////////////////////////////////////////////

    await consumedEvent(connection, event, seq);

    await connection.commit();

    logger.info({
      service: "service-product-consumer",
      event: "event.consumed",
      message: "event consumed",
      eventId: event.id,
    });

    response = Promise.resolve(true);
  } catch (error: any) {
    logger.error({
      service: "service-product-consumer",
      event: "event.error",
      message: `event error`,
      eventId: event.id,
      error: error.message,
      stack: error.stack,
    });

    if (connection) await connection.rollback();

    response = Promise.resolve(false);
  } finally {
    if (connection) connection.release();
  }

  return response;
};

const handlers: any = {
  ProcessedFile,
};

export const processEvent = (message: any) => {
  const messageDecoded = new TextDecoder().decode(message.data);

  const event = JSON.parse(messageDecoded);

  console.log(message.seq, event.id, event.type);

  return handlers[event.type](event, message.seq);
};
