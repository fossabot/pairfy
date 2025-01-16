import { PoolConnection } from "mysql2";
import { getEventId } from "../utils/index.js";

async function collected(
  connection: PoolConnection,
  threadtoken: string,
  timestamp: number,
  utxo: any,
  seller_id: string,
  buyer_pubkeyhash: string,
  buyer_address: string,
  seller_address: string
) {
  const statusLog = "collected";

  const updateQuery = `
    UPDATE orders
    SET finished = ?,
        scanned_at = ?,
        status_log = ?,
        contract_state = ?,
        collected_tx = ?,
        collected_block = ?
    WHERE id = ?`;

  const collectedTx = utxo.txHash + "#" + utxo.outputIndex;

  await connection.execute(updateQuery, [
    true,
    timestamp,
    statusLog,
    utxo.data.state,
    collectedTx,
    utxo.block_time,
    threadtoken,
  ]);

  /////////////////////////////////////////////////////////////////////

  const notifications = [
    {
      id: getEventId(),
      type: "order",
      title: "Order Finished",
      owner: buyer_pubkeyhash,
      data: JSON.stringify({
        threadtoken,
        buyer_address
      }),
      message: `The order has ended without appeal.`,
    },
    {
      id: getEventId(),
      type: "order",
      title: "Funds Collected",
      owner: seller_id,
      data: JSON.stringify({
        threadtoken,
        seller_address
      }),
      message: `The funds have been sent to your wallet.`,
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

export { collected };
