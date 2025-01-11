import { PoolConnection } from "mysql2";
import { getEventId } from "../utils/index.js";

async function handleReceived(
  connection: PoolConnection,
  threadtoken: string,
  timestamp: number,
  utxo: any,
  seller_id: string,
  buyer_pubkeyhash: string,
  buyer_address: string,
  seller_address: string
) {
  const statusLog = "received";

  const updateQuery = `
    UPDATE orders
    SET scanned_at = ?,
        status_log = ?,
        contract_state = ?,
        received_tx = ?,
        received_block = ?
    WHERE id = ?`;

  const receivedTx = utxo.txHash + "#" + utxo.outputIndex;

  await connection.execute(updateQuery, [
    timestamp,
    statusLog,
    utxo.data.state,
    receivedTx,
    utxo.block_time,
    utxo.metadata,
    threadtoken,
  ]);

  /////////////////////////////////////////////////////////////////////

  const notifications = [
    {
      id: getEventId(),
      type: "order",
      title: "Package Received",
      owner: buyer_pubkeyhash,
      data: JSON.stringify({
        threadtoken,
        buyer_address
      }),
      message: `You have received the package.`,
    },
    {
      id: getEventId(),
      type: "order",
      title: "Package Received",
      owner: seller_id,
      data: JSON.stringify({
        threadtoken,
        seller_address
      }),
      message: `The buyer has received the package.`,
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

export { handleReceived };
