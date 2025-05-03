import database from "../../database/client.js";
import {
  isProcessedEvent,
  consumedEvent,
  logger,
  insertProduct,
} from "@pairfy/common";
import { createProductIndex } from "./weaviate.js";

export const CreateProduct = async (
  event: any,
  seq: number
): Promise<boolean> => {
  let response = null;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const isProcessed = await isProcessedEvent(connection, event.id);

    if (isProcessed) {
      return Promise.resolve(true);
    }

    const dataParsed = JSON.parse(event.data);

    await connection.beginTransaction();

    ///////////////////////////////////////////////////////

    const [productCreated] = await insertProduct(connection, dataParsed);

    if (productCreated.affectedRows !== 1) {
      throw new Error("CreateProductError");
    }

    const createIndex = await createProductIndex(dataParsed);

    if(!createIndex){
      throw new Error("CreateProductIndexError");
    }

    await consumedEvent(connection, event, seq);

    ///////////////////////////////////////////////////////

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
