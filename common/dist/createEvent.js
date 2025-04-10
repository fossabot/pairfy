"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = createEvent;
const nanoid_1 = require("nanoid");
const getEventId = (0, nanoid_1.customAlphabet)("abcdefghijklmnopqrstuvwxyz0123456789", 26);
async function createEvent(connection, source, type, data, agentId) {
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
//end
