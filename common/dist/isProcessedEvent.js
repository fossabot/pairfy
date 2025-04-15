"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProcessedEvent = isProcessedEvent;
const logger_1 = __importDefault(require("./logger"));
async function isProcessedEvent(connection, id) {
    const [findProcessed] = await connection.execute("SELECT id FROM processed WHERE id = ? AND processed = ?", [id, true]);
    if (findProcessed.length > 0) {
        logger_1.default.info("eventRepeated");
        return true;
    }
    else {
        return false;
    }
}
