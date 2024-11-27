import mysql from "mysql2";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const sqlDirectoryPath = path.join(__dirname, "src/db");


const mysqlHost = "mysql";
const mysqlUser = "root"; 
const mysqlPassword = "password";
const mysqlDatabase = process.env.MYSQL_DATABASE;

const connection = mysql.createConnection({
  host: "mysql",
  port: 3306,
  user: "root",
  password: "password",
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    process.exit(1);
  }

  console.log("Conexión exitosa a MySQL");

  connection.query(
    "CREATE DATABASE IF NOT EXISTS service_product",
    (err, results) => {
      if (err) {
        console.error("Error creating database:", err);
        process.exit(1);
      }

      console.log('Database "service_product" is ready.');

      connection.query("USE service_product", (err, results) => {
        if (err) {
          console.error("Error selecting database:", err);
          process.exit(1);
        }

        executeSqlScripts();
      });
    }
  );
});



function executeSqlScripts() {
  fs.readdir(sqlDirectoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      process.exit(1);
    }

    const SQLS = files.filter((file) => file.endsWith(".sql"));

    SQLS.forEach((file) =>
      fs.readFile(
        path.join(sqlDirectoryPath, file),
        "utf8",
        (err, sqlScript) => {
          if (err) {
            console.error(`Error reading file ${file}:`, err);
            process.exit(1);
          }

          connection.query(sqlScript, (err, results) => {
            if (err) {
              console.error(`Error executing SQL from file ${file}:`, err);
              process.exit(1);
            } else {
              console.log(`${file} executed successfully.`);
            }
          });
        }
      )
    );
  });
}
