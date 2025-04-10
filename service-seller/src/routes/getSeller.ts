import { Connection, RowDataPacket } from "mysql2/promise";

export async function getSellerById(
  connection: Connection,
  id: string
): Promise<any> {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM sellers WHERE id = ?`,
    [id]
  );

  if (rows.length === 0) {
    throw new Error("getSellerByIdError");
  }

  return rows[0]
}
