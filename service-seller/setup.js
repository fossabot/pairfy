const mysql = require('mysql2/promise');
const { loadSql } = require('@pairfy/common');

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

if (!DATABASE_HOST || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_NAME) {
  console.error("❌ Missing one or more required environment variables.");
  process.exit(1);
}

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: DATABASE_HOST,
      port: parseInt(DATABASE_PORT) || 3306,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      multipleStatements: true,
    });

    console.log("✅ Conectado al servidor MySQL");

    // Crear base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE_NAME}\`;`);
    await connection.query(`USE \`${DATABASE_NAME}\`;`);
    console.log(`✅ Base de datos '${DATABASE_NAME}' verificada y seleccionada.`);

    // 🗂 Lista de archivos SQL a ejecutar (en orden)
    const sqlFiles = ['events.sql', 'sellers.sql'];

    for (const file of sqlFiles) {
      console.log(`📄 Ejecutando ${file}...`);
      const sql = loadSql(file);
      await connection.query(sql);
      console.log(`✅ ${file} ejecutado correctamente.`);
    }

    await connection.end();
    console.log("🚪 Conexión cerrada.");

  } catch (err) {
    console.error("❌ Error durante el setup:", err.message);
    process.exit(1);
  }
})();
