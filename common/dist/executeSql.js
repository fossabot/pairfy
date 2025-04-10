"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSqlFile = loadSqlFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function loadSqlFile(filename) {
    const fullPath = path_1.default.join(__dirname, '../sql', filename);
    return fs_1.default.readFileSync(fullPath, 'utf-8');
}
