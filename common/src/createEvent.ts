import { Connection } from "mysql2/promise";
import { customAlphabet } from "nanoid";

const getEventId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 26);

export async function createEvent(
  connection: Connection,
  timestamp: number,
  source: string,
  type: string,
  data: string,
  agentId: string
): Promise<any> {
  const sql = `
    INSERT INTO events (
      id,
      source,
      type,
      data,
      agent_id,
      created_at,
      updated_at,
      spec_version
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [getEventId(), source, type, data, agentId, timestamp, timestamp, 0];

  return await connection.execute(sql, values);
}
