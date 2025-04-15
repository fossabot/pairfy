import { Connection, RowDataPacket } from "mysql2/promise";

export async function getSellerByUsername(
  connection: Connection,
  username: string
): Promise<any> {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM sellers WHERE username = ?`,
    [username]
  );

  return rows[0]
}
