import { Connection } from 'mysql2/promise';

export async function mediaGroupExists(
  connection: Connection,
  mediaGroupId: string,
  agentId: string
): Promise<boolean> {
  const [rows] = await connection.query(
    `SELECT 1 FROM files WHERE media_group_id = ? AND agent_id = ? LIMIT 1`,
    [mediaGroupId, agentId]
  );

  return Array.isArray(rows) && rows.length > 0;
}


export async function insertFile(
  connection: Connection,
  scheme: any
): Promise<any> {

  const columns = Object.keys(scheme);

  const values = Object.values(scheme);

  const sql = `
    INSERT INTO files (${columns.join(", ")})
    VALUES (${columns.map(() => "?").join(", ")})
  `;

  return await connection.execute(sql, values);
}
