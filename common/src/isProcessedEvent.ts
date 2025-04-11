import { Connection, RowDataPacket } from "mysql2/promise";
import { logger } from "./logger.js";

export async function isProcessedEvent(
  connection: Connection,
  id: string
): Promise<boolean> {
  const [findProcessed] = await connection.execute<RowDataPacket[]>(
    "SELECT id FROM processed WHERE id = ? AND processed = ?",
    [id, true]
  );

  if (findProcessed.length > 0) {
    logger.info("eventRepeated");

    return true;
  } else {
    return false;
  }
}
