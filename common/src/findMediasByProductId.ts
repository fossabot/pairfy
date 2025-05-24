import { Connection, RowDataPacket } from "mysql2/promise";

export async function findMediasByProductId(
  connection: Connection,
  product_id: string
): Promise<any> {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM media WHERE product_id = ?`,
    [product_id]
  );

  return rows || []
}
