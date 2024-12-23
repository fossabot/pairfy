import { PoolConnection } from "mysql2";
import { getEventId } from "../utils/index.js";

async function handleShipping(
  connection: PoolConnection,
  threadtoken: string,
  timestamp: number,
  utxo: any,
  seller_id: string,
  buyer_pubkeyhash: string,
  buyer_address: string,
  seller_address: string
) {
  const statusLog = "shipping";

  const updateQuery = `
    UPDATE orders
    SET scanned_at = ?,
        status_log = ?,
        contract_state = ?,
        shipping_tx = ?,
        shipping_block = ?,
        shipping_metadata = ?
    WHERE id = ?`;

  const shippingTx = utxo.txHash + "#" + utxo.outputIndex;

  await connection.execute(updateQuery, [
    timestamp,
    statusLog,
    utxo.data.state,
    shippingTx,
    utxo.block_time,
    utxo.metadata,
    threadtoken,
  ]);

  /////////////////////////////////////////////////////////////////////

  const notifications = [
    {
      id: getEventId(),
      type: "order",
      title: "Product Shipped 📦",
      owner: buyer_pubkeyhash,
      data: JSON.stringify({
        threadtoken,
        buyer_address
      }),
      message: `The seller has shipped your package from order (${threadtoken}) / Account / ${buyer_address}`,
    },
    {
      id: getEventId(),
      type: "order",
      title: "Product Shipped 📦",
      owner: seller_id,
      data: JSON.stringify({
        threadtoken,
        seller_address
      }),
      message: `You have shipped the package of order (${threadtoken}) / Account / ${seller_address}`,
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

export { handleShipping };
