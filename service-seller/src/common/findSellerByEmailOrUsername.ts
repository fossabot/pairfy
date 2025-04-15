import { Connection, RowDataPacket } from "mysql2/promise";

export async function findSellerByEmailOrUsername(
  connection: Connection,
  email: string,
  username: string
): Promise<any> {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM sellers WHERE email = ? OR username = ? LIMIT 1`,
    [email, username]
  );

  return rows?.[0] || null;
}
