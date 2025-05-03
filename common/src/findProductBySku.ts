import { Connection, RowDataPacket } from "mysql2/promise";

export async function findProductBySku(
  connection: Connection,
  seller: string,
  sku: string
): Promise<any> {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM products WHERE seller_id = ? AND sku = ?`,
    [seller, sku]
  );

  return rows?.[0] || null
}
