"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProcessedEvent = isProcessedEvent;
const index_js_1 = require("../utils/index.js");
async function isProcessedEvent(connection, id) {
    const [findProcessed] = await connection.execute("SELECT id FROM processed WHERE id = ? AND processed = ?", [id, true]);
    if (findProcessed.length > 0) {
        index_js_1.logger.info("eventRepeated");
        return true;
    }
    else {
        return false;
    }
}
