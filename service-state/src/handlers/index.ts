import { redisClient } from "../db/redis.js";
import { axiosAPI } from "../axios/index.js";
import { logger } from "../utils/index.js";
import { database } from "../db/client.js";

async function scanThreadToken(job: any) {
  let connection = null;
  try {
    connection = await database.client.getConnection();

    const { threadtoken, watch_until } = job.data;

    console.log(threadtoken, watch_until);

    const now = Date.now();

    let isFinished = false;

    if (now > watch_until) {
      isFinished = true;
    }

    await connection.beginTransaction();

    const newState = 1;

    const updateQuery = `
      UPDATE orders
      SET finished = ?, contract_state = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND contract_state != ?;
      `;

    await connection.execute(updateQuery, [
      isFinished,
      newState,
      threadtoken,
      newState,
    ]);

    await connection.commit();

    console.log("STATE UPDATED.");
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
