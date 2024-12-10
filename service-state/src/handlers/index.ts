import { redisClient } from "../db/redis.js";
import { axiosAPI } from "../axios/index.js";
import { logger } from "../utils/index.js";
import { database } from "../db/client.js";

async function scanThreadToken(job: any) {
  let connection = null;
  try {
    connection = await database.client.getConnection();

    const { threadtoken, watch_until } = job.data;

    const timestamp = Date.now();

    const tx = null;

    let finished = false;

    if (timestamp > watch_until && !tx) {
      finished = true;
    }

    await connection.beginTransaction();

    const newState = 1;

    const updateQuery = `
      UPDATE orders
      SET finished = ?, contract_state = ?, scanned_at = ?
      WHERE id = ?;
      `;

    await connection.execute(updateQuery, [
      finished,
      newState,
      timestamp,
      threadtoken
    ]);

    await connection.commit();

    return {
      finished,
      timestamp,
    };
  } catch (err) {
    logger.error(err);

    if (connection) {
      connection.rollback();
    }

    throw err;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export { scanThreadToken };
