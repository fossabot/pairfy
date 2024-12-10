import { logger } from "../utils/index.js";
import { database } from "../db/client.js";
import { getUtxo } from "../lib/index.js";

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

    await connection.beginTransaction();

    if (code === 200) {
      const updateQuery = `
        UPDATE orders
        SET finished = ?,
            scanned_at = ?,
            contract_address = ?,
            contract_state = ?,
            pending_tx = ?,
            pending_block = ?
        WHERE id = ?`;

      const pendingTx = utxo.txHash + "#" + utxo.outputIndex;

      await connection.execute(updateQuery, [
        finished,
        timestamp,
        utxo.address,
        utxo.data.state,
        pendingTx,
        utxo.block_time,
        threadtoken,
      ]);
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
