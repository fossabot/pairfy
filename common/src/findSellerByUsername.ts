import { Connection, RowDataPacket } from "mysql2/promise";

export async function findSellerByUsername(
  connection: Connection,
  username: string
): Promise<any> {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM sellers WHERE username = ?`,
    [username]
  );

  return rows?.[0] || null
}
