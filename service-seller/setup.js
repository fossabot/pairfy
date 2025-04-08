import mysql from "mysql2";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sqlDirectoryPath = path.join(__dirname, "src/database");

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

if (!DATABASE_HOST || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_NAME) {
  console.error("Missing one or more required environment variables.");
  process.exit(1);
}

const connection = mysql.createConnection({
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT) || 3306,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.error("SETUP: Database connection error", err);
    process.exit(1);
  }

  console.log("SETUP: Database connected successfully");

  connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${DATABASE_NAME}\``,
    (err) => {
      if (err) {
        console.error("SETUP: Error creating database:", err);
        process.exit(1);
      }

      console.log(`SETUP: Database '${DATABASE_NAME}' is ready.`);

      connection.query(`USE \`${DATABASE_NAME}\``, (err) => {
        if (err) {
          console.error("SETUP: Error selecting database:", err);
          process.exit(1);
        }

        executeScripts();
      });
    }
  );
});

function executeScripts() {
  fs.readdir(sqlDirectoryPath, (err, files) => {
    if (err) {
      console.error("SETUP: Error reading directory:", err);
      process.exit(1);
    }

    const sqlFiles = files.filter((file) => file.endsWith(".sql"));
    if (sqlFiles.length === 0) {
      console.log("SETUP: No SQL files found.");
      connection.end();
      return;
    }

    let completed = 0;

    sqlFiles.forEach((file) => {
      const fullPath = path.join(sqlDirectoryPath, file);

      fs.readFile(fullPath, "utf8", (err, sqlScript) => {
        if (err) {
          console.error(`SETUP: Error reading ${file}:`, err);
          return checkDone();
        }

        connection.query(sqlScript, (err) => {
          if (err) {
            console.error(`SETUP: Error executing ${file}:`, err);
          } else {
            console.log(`SETUP: '${file}' executed successfully.`);
          }

          checkDone();
        });
      });
    });

    function checkDone() {
      completed++;
      if (completed === sqlFiles.length) {
        console.log("SETUP: All SQL scripts executed.");
        connection.end();
      }
    }
  });
}
