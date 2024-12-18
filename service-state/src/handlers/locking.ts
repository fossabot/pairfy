import { PoolConnection } from "mysql2";
import { getEventId } from "../utils/index.js";

async function handleLocking(
  connection: PoolConnection,
  threadtoken: string,
  timestamp: number,
  utxo: any,
  seller_id: string,
  buyer_pubkeyhash: string,
  buyer_address: string,
  seller_address: string
) {
  const statusLog = "locking";

  const updateQuery = `
    UPDATE orders
    SET finished = ?,
        scanned_at = ?,
        status_log = ?,
        contract_state = ?,
        locking_tx = ?,
        locking_block = ?
    WHERE id = ?`;

  const lockingTx = utxo.txHash + "#" + utxo.outputIndex;

  await connection.execute(updateQuery, [
    false,
    timestamp,
    statusLog,
    utxo.data.state,
    lockingTx,
    utxo.block_time,
    threadtoken,
  ]);

  /////////////////////////////////////////////////////////////////////

  const notifications = [
    {
      id: getEventId(),
      type: "order",
      title: "Preparing the Product",
      owner: buyer_pubkeyhash,
      data: JSON.stringify({
        threadtoken,
        buyer_address
      }),
      message: `The seller is preparing the package for shipping / Order / (${threadtoken}) / Account / ${buyer_address}`,
    },
    {
      id: getEventId(),
      type: "order",
      title: "Prepare the Product",
      owner: seller_id,
      data: JSON.stringify({
        threadtoken,
        seller_address
      }),
      message: `Please prepare the package. You have accepted the order (${threadtoken}) / Account / ${seller_address}`,
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

export { handleLocking };
