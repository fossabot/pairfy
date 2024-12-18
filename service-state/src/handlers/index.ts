import { logger } from "../utils/index.js";
import { database } from "../db/client.js";
import { getUtxo } from "../lib/index.js";
import { handlePending } from "./pending.js";
import { handleReturn } from "./return.js";
import { handleLocking } from "./locking.js";

async function scanThreadToken(job: any) {
  let connection = null;

  try {
    const {
      threadtoken,
      watch_until,
      seller_id,
      buyer_pubkeyhash,
      buyer_address,
      seller_address,
    } = job.data;

    const { code, utxo } = await getUtxo(threadtoken);

    console.log(code);

    const timestamp = Date.now();

    let finished = false;

    let status = "created";

    if (timestamp > watch_until && code === 404) {
      finished = true;
      status = "expired";
    }

    connection = await database.client.getConnection();

    ///////////////////////////////////////////////////////////////

    await connection.beginTransaction();

    if (code === 200) {
      switch (utxo.data.state) {
        case null:
          break;
        case 0n:
          await handlePending(
            connection,
            threadtoken,
            timestamp,
            utxo,
            seller_id,
            buyer_pubkeyhash,
            buyer_address,
            seller_address
          );
          break;
        case -1n:
          await handleReturn(
            connection,
            threadtoken,
            timestamp,
            utxo,
            seller_id,
            buyer_pubkeyhash,
            buyer_address,
            seller_address
          );
          break;
        case 1n:
          await handleLocking(
            connection,
            threadtoken,
            timestamp,
            utxo,
            seller_id,
            buyer_pubkeyhash,
            buyer_address,
            seller_address
          );
          break;
      }
    } else {
      const updateQuery = `
        UPDATE orders
        SET finished = ?,
            scanned_at = ?,
            status_log = ?
        WHERE id = ?`;

      await connection.execute(updateQuery, [
        finished,
        timestamp,
        status,
        threadtoken,
      ]);
    }

    await connection.commit();

    ///////////////////////////////////////////////////////////////
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
