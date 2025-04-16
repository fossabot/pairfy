"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = createEvent;
const index_1 = require("./index");
async function createEvent(connection, timestamp, source, type, data, agentId) {
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
    const getEventId = (0, index_1.createId)("abcdefghijklmnopqrstuvwxyz0123456789", 26);
    const values = [getEventId, source, type, data, agentId, timestamp, timestamp, 0];
    return await connection.execute(sql, values);
}
