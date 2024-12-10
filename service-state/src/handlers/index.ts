import { logger } from "../utils/index.js";
import { database } from "../db/client.js";
import { Data, fromText } from "@lucid-evolution/lucid";
import { lucid, StateMachineDatum } from "../lib/index.js";

async function scanThreadToken(job: any) {
  let connection = null;
  try {
    connection = await database.client.getConnection();

    const { threadtoken, watch_until } = job.data;

    const timestamp = Date.now();

    const unit = threadtoken + fromText("threadtoken");

    let finished = false;

    console.log(unit);

    let utxo = null;
 
    try {
      const getUtxo = await lucid.utxoByUnit(unit);

      if (getUtxo.datum) {
        console.log(getUtxo);

        const datum = Data.from(getUtxo.datum, StateMachineDatum);

        console.log(datum);
      }
     
    } catch (err) {
      console.error(err);
    }


    if (timestamp > watch_until && !utxo) {
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
      threadtoken,
    ]);

    await connection.commit();

    return {
      threadtoken,
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
