"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumedEvent = consumedEvent;
const logger_1 = __importDefault(require("./logger"));
async function consumedEvent(connection, event, seq) {
    const [result] = await connection.execute("INSERT INTO processed (id, seq, type, processed, created_at) VALUES (?, ?, ?, ?, ?)", [event.id, seq, event.type, true, Date.now()]);
    const check = "affectedRows" in result && result.affectedRows === 1;
    if (!check) {
        throw new Error("consumedEventError");
    }
    logger_1.default.info("consumedEvent");
}
