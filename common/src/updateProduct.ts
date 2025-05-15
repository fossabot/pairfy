import mysql from "mysql2/promise";

/**Update model without data verification without error handling */ 
export const updateProduct = async (
  connection: mysql.Connection,
  id: string,
  schema_v: number,
  data: any
) => {

  const fields = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");

  const sql = `
    UPDATE products
    SET ${fields}
    WHERE id = ? AND schema_v = ?
    `;

  const values = [...Object.values(data), id, schema_v];

  const [rows] = await connection.execute<mysql.ResultSetHeader>(sql, values);

  return rows;
};
