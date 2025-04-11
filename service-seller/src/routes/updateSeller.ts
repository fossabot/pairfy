import mysql from "mysql2/promise";
import { ApiError } from "../common/errorHandler";

export const updateSeller = async (
  connection: mysql.Connection,
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

  const values = [...Object.values(payload), payload.id, payload.schema_v - 1];

  const [rows] = await connection.execute<mysql.ResultSetHeader>(
    sql,
    values
  );

  if (rows.affectedRows !== 1) {
    throw new ApiError(409, "Update failed: version mismatch or not found", {
        code: "UPDATE_CONFLICT",
        details: { id: payload.id },
      });
  }
};
