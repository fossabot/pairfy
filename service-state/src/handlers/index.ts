import { logger } from "../utils/index.js";
import { database } from "../db/client.js";
import { getUtxo, handlePending } from "../lib/index.js";

async function scanThreadToken(job: any) {
  let connection = null;

  try {
    const { threadtoken, watch_until } = job.data;

    const timestamp = Date.now();

    let finished = false;

    const { code, utxo } = await getUtxo(threadtoken);

    console.log(code, utxo);

    if (timestamp > watch_until && code === 404) {
      finished = true;
    }

    connection = await database.client.getConnection();

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
            scanned_at = ?
        WHERE id = ?`;

      await connection.execute(updateQuery, [finished, timestamp, threadtoken]);
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
