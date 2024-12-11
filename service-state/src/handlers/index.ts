import { logger } from "../utils/index.js";
import { database } from "../db/client.js";
import { getUtxo, handlePending } from "../lib/index.js";

async function scanThreadToken(job: any) {
  let connection = null;

  try {
    const { threadtoken, watch_until } = job.data;

    const timestamp = Date.now();

    let finished = false;

    let statusLog = "Created";

    const { code, utxo } = await getUtxo(threadtoken);

    console.log(code, utxo);

    if (timestamp > watch_until && code === 404) {
      finished = true; 
      statusLog = "Expired";
    }

    connection = await database.client.getConnection();

    await connection.beginTransaction();

    if (code === 200) {
      switch (utxo.data.state) {
        case 0n:
          await handlePending(
            connection,
            threadtoken,
            finished,
            timestamp,
            utxo
          );
          break;
        case 1n:
          console.log("1");
      }
    } else {
      const updateQuery = `
        UPDATE orders
        SET finished = ?,
            scanned_at = ?,
            status_log = ?
        WHERE id = ?`;

      await connection.execute(updateQuery, [finished, timestamp, statusLog, threadtoken]);
    }

    await connection.commit();

    return {
      threadtoken,
      finished,
      timestamp,
    };
  } catch (err) {
    logger.error(err);

    if (connection) {
      await connection.rollback();
    }

    throw err;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export { scanThreadToken };
