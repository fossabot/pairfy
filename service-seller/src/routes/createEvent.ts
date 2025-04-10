import { Connection } from "mysql2/promise";
import { getEventId } from "../utils/nano";

export async function createEvent(
  connection: Connection,
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
      spec_version
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [getEventId(), source, type, data, agentId, 0];

  return await connection.execute(sql, values);
}
