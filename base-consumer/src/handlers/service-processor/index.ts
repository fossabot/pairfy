import database from "../../database/client.js";
import { isProcessedEvent, consumedEvent, logger } from "@pairfy/common";
import { processFile } from "./queues/media.js";

const CreateFile = async (event: any, seq: number): Promise<boolean> => {
  let response = null;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const processed = await isProcessedEvent(connection, event.id);

    if (processed) {
      logger.error({
        timestamp: new Date().toISOString(),
        service: "service-processor-consumer",
        event: "event.repeated",
        message: `event repeated`,
        eventId: event.id,
      });

      return Promise.resolve(true);
    }

    const dataParsed = JSON.parse(event.data);

    await connection.beginTransaction();

    ///////////////////////////////////////////////////////

    const processedFile = await processFile(dataParsed);

    if (!processedFile) {
      throw new Error("processFileError");
    }

    ///////////////////////////////////////////////////////

    await consumedEvent(connection, event, seq);

    await connection.commit();

    response = Promise.resolve(true);
  } catch (error: any) {
    logger.error({
      timestamp: new Date().toISOString(),
      service: "service-processor-consumer",
      event: "event.error",
      message: `event error`,
      eventId: event.id,
      error: error.message,
      stack: error.stack
    });

    if (connection) await connection.rollback();

    response = Promise.resolve(false);
  } finally {
    if (connection) connection.release();
  }

  return response;
};

const handlers: any = {
  CreateFile,
};

export const processEvent = (message: any) => {
  const messageDecoded = new TextDecoder().decode(message.data);

  const event = JSON.parse(messageDecoded);

  console.log(message.seq, event.id, event.type);

  return handlers[event.type](event, message.seq);
};
