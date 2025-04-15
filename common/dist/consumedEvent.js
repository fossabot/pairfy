"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumedEvent = consumedEvent;
const index_1 = require("./index");
async function consumedEvent(connection, event, seq) {
    const [result] = await connection.execute("INSERT INTO processed (id, seq, type, processed, created_at) VALUES (?, ?, ?, ?, ?)", [event.id, seq, event.type, true, Date.now()]);
    const check = "affectedRows" in result && result.affectedRows === 1;
    if (!check) {
        throw new Error("consumedEventError");
    }
    index_1.logger.info("consumedEvent");
}
