import { PoolConnection } from "mysql2";

async function handlePending(
  connection: PoolConnection,
  threadtoken: string,
  finished: boolean,
  timestamp: number,
  utxo: any
) {
  const statusLog = "pending";

  const updateQuery = `
    UPDATE orders
    SET finished = ?,
        scanned_at = ?,
        status_log = ?,
        contract_address = ?,
        contract_state = ?,
        pending_tx = ?,
        pending_block = ?
    WHERE id = ?`;

  const pendingTx = utxo.txHash + "#" + utxo.outputIndex;

  await connection.execute(updateQuery, [
    finished,
    timestamp,
    statusLog,
    utxo.address,
    utxo.data.state,
    pendingTx,
    utxo.block_time,
    threadtoken,
  ]);
}

export { handlePending };
