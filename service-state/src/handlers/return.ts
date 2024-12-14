import { PoolConnection } from "mysql2";

async function handleReturn(
  connection: PoolConnection,
  threadtoken: string,
  finished: boolean,
  timestamp: number,
  utxo: any
) {
  const statusLog = "returned";

  const updateQuery = `
    UPDATE orders
    SET finished = ?,
        scanned_at = ?,
        status_log = ?,
        contract_state = ?,
        return_tx = ?,
        return_block = ?
    WHERE id = ?`;

  const returnTx = utxo.txHash + "#" + utxo.outputIndex;

  await connection.execute(updateQuery, [
    finished,
    timestamp,
    statusLog,
    utxo.data.state,
    returnTx,
    utxo.block_time,
    threadtoken,
  ]);
}

export { handleReturn };
