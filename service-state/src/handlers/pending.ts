import { PoolConnection } from "mysql2";

async function handlePending(
  connection: PoolConnection,
  threadtoken: string,
  timestamp: number,
  utxo: any,
  seller_id: string,
  buyer_pubkeyhash: string
) {
  const statusLog = "pending";

  const updateQuery = `
    UPDATE orders
    SET scanned_at = ?,
        status_log = ?,
        contract_address = ?,
        contract_state = ?,
        pending_tx = ?,
        pending_block = ?
    WHERE id = ?`;

  const pendingTx = utxo.txHash + "#" + utxo.outputIndex;

  await connection.execute(updateQuery, [
    timestamp,
    statusLog,
    utxo.address,
    utxo.data.state,
    pendingTx,
    utxo.block_time,
    threadtoken,
  ]);

  /////////////////////////////////////////////////////////////////////

  const notifications = [
    {
      type: "order",
      title: "Payment Detected",
      owner: buyer_pubkeyhash,
      data: {
        threadtoken,
      },
      message: `Payment for order (${threadtoken}) is being processed on the Cardano network.`,
    },
    {
      type: "order",
      title: "New Product Purchase",
      owner: seller_id,
      data: {
        threadtoken,
      },
      message: `Payment for order (${threadtoken}) is being processed on the Cardano network.`,
    },
  ];

  const eventSchema = `
    INSERT IGNORE INTO events (
    id,
    source,
    type,
    data,
    spec_version
    ) VALUES (?, ?, ?, ?, ?)
  `;

  const eventId = threadtoken + statusLog;

  await connection.execute(eventSchema, [
    eventId,
    "gateway",
    "CreateNotification",
    JSON.stringify(notifications),
    0,
  ]);
}

export { handlePending };
