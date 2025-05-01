"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProcessedEvent = isProcessedEvent;
const index_1 = require("./index");
async function isProcessedEvent(connection, id) {
    const [findProcessed] = await connection.execute("SELECT id FROM processed WHERE id = ? AND processed = ?", [id, true]);
    if (findProcessed.length > 0) {
        index_1.logger.info("eventRepeated");
        return true;
    }
    else {
        return false;
    }
}
