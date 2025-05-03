import { Connection, RowDataPacket } from "mysql2/promise";

export async function findProductById(
  connection: Connection,
  id: string
): Promise<any> {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM products WHERE id = ?`,
    [id]
  );

  return rows?.[0] || null
}
