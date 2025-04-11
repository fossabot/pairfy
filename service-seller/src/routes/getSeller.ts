import { Connection, RowDataPacket } from "mysql2/promise";
import { ApiError, ERROR_CODES } from "../common/errorHandler";

export async function getSellerByEmail(
  connection: Connection,
  email: string
): Promise<any> {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM sellers WHERE email = ?`,
    [email]
  );

  if (rows.length === 0) {
    throw new ApiError(400, "Seller not found", {
      code: ERROR_CODES.NOT_FOUND
    });
  }

  return rows[0]
}
