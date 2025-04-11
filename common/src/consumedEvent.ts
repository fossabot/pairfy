import { logger } from "../utils/index.js";
import { Connection } from "mysql2/promise";

export async function consumedEvent(
  connection: Connection,
  event: any,
  seq: number
) {
  const [result] = await connection.execute(
    "INSERT INTO processed (id, seq, type, processed, created_at) VALUES (?, ?, ?, ?, ?)",
    [event.id, seq, event.type, true, Date.now()]
  );

  const check = "affectedRows" in result && result.affectedRows === 1

  if(!check){
    throw new Error("consumedEventError");
  }

  logger.info("consumedEvent");
}
