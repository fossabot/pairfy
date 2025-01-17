import { PoolConnection } from "mysql2";
import { getEventId } from "../utils/index.js";

async function handleReturn(
  connection: PoolConnection,
  threadtoken: string,
  timestamp: number,
  utxo: any,
  seller_id: string,
  buyer_pubkeyhash: string,
  buyer_address: string,
  seller_address: string
) {
  const statusLog = "return";

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
    true,
    timestamp,
    statusLog,
    utxo.data.state,
    returnTx,
    utxo.block_time,
    threadtoken,
  ]);

  /////////////////////////////////////////////////////////////////////

  const notifications = [
    {
      id: getEventId(),
      type: "order",
      title: "Payment Returned",
      owner: buyer_pubkeyhash,
      data: JSON.stringify({
        threadtoken,
        buyer_address
      }),
      message: `The payment for the order (${threadtoken}) is being returned to your wallet. / Account / ${buyer_address}`,
    },
    {
      id: getEventId(),
      type: "order",
      title: "Payment Returned",
      owner: seller_id,
      data: JSON.stringify({
        threadtoken,
        seller_address
      }),
      message: `The buyer has cancelled the order (${threadtoken}) due to lack of interest. / Account / ${seller_address}`,
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

export { handleReturn };
