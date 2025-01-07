import { PoolConnection } from "mysql2";
import { getEventId } from "../utils/index.js";

async function handlePending(
  connection: PoolConnection,
  threadtoken: string,
  timestamp: number,
  utxo: any,
  seller_id: string,
  buyer_pubkeyhash: string,
  buyer_address: string,
  seller_address: string,
  country: string
) {
  const statusLog = "pending";

  const updateQuery = `
    UPDATE orders
    SET scanned_at = ?,
        status_log = ?,
        contract_address = ?,
        contract_state = ?,
        pending_tx = ?,
        pending_block = ?,
        pending_metadata = ?
    WHERE id = ?`;

  const pendingTx = utxo.txHash + "#" + utxo.outputIndex;

  await connection.execute(updateQuery, [
    timestamp,
    statusLog,
    utxo.address,
    utxo.data.state,
    pendingTx,
    utxo.block_time,
    utxo.metadata,
    threadtoken,
  ]);

  /////////////////////////////////////////////////////////////////////

  const notifications = [
    {
      id: getEventId(),
      type: "order",
      title: "Payment Detected",
      owner: buyer_pubkeyhash,
      data: JSON.stringify({
        threadtoken,
        buyer_address,
        country
      }),
      message: `Payment is being processed on the Cardano network.`,
    },
    {
      id: getEventId(),
      type: "order",
      title: "New Purchase",
      owner: seller_id,
      data: JSON.stringify({
        threadtoken,
        seller_address,
        country
      }),
      message: `Payment is being processed on the Cardano network.`
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
