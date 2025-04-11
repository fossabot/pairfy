"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSeller = createSeller;
async function createSeller(connection, scheme) {
    const columns = Object.keys(scheme);
    const values = Object.values(scheme);
    const sql = `
    INSERT INTO sellers (${columns.join(", ")})
    VALUES (${columns.map(() => "?").join(", ")})
  `;
    return await connection.execute(sql, values);
}
