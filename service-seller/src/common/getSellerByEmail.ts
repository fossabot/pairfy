import { Connection, RowDataPacket } from "mysql2/promise";

export async function getSellerByEmail(
  connection: Connection,
  email: string
): Promise<any> {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM sellers WHERE email = ?`,
    [email]
  );

  return rows[0]
}
