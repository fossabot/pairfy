import { clearInterval } from "timers";
import { DatabaseWrap } from "./client.js";
import { logger } from "../utils/index.js";

let interval: any = null;

async function ping(database: DatabaseWrap) {
  let connection = null;
  try {
    connection = await database.client.getConnection();

    await connection.ping();

    console.log("Database Online");
  } catch (err) {
    logger.error("Database Error", err);

    if (connection) {
      await connection.rollback();
    }

    clearInterval(interval);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export function watchDatabase() {
  interval = setInterval(ping, 30000);
}
