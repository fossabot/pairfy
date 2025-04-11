import mysql from "mysql2/promise";
import { ApiError, ERROR_CODES } from "../common/errorHandler";

export const updateSeller = async (
  connection: mysql.Connection,
  id: string,
  schema_v: number,
  payload: any
) => {
  const fields = Object.keys(payload)
    .map((key) => `${key} = ?`)
    .join(", ");

  const sql = `
    UPDATE sellers
    SET ${fields}
    WHERE id = ? AND schema_v = ?
    `;

  const values = [...Object.values(payload), id, schema_v];

  const [rows] = await connection.execute<mysql.ResultSetHeader>(
    sql,
    values
  );

  if (rows.affectedRows !== 1) {
    throw new ApiError(409, "Update failed: version mismatch or not found", {
        code: ERROR_CODES.UPDATE_CONFLICT,
        details: { id: id },
      });
  }
};
