import mysql from "mysql2/promise";
import weaviate from "weaviate-ts-client";
import { loadSql } from "@pairfy/common";

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
      port: DATABASE_PORT ? parseInt(DATABASE_PORT, 10) : 3306,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      multipleStatements: true,
    });

    console.log("✅ Connected to MySQL server");

    // Create database if it does not exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${DATABASE_NAME}\`;`
    );
    await connection.query(`USE \`${DATABASE_NAME}\`;`);
    console.log(`✅ Database '${DATABASE_NAME}' verified and selected.`);

    // 🗂 List of SQL files to execute (in order)
    const sqlFiles: string[] = ["events.sql", "products.sql"];

    for (const file of sqlFiles) {
      console.log(`📄 Executing ${file}...`);
      const sql: string = loadSql(file);
      await connection.query(sql);
      console.log(`✅ ${file} executed successfully.`);
    }

    await connection.end();
    console.log("🚪 Connection closed.");
  } catch (err) {
    const error = err as Error;
    console.error("❌ Error during setup:", error.message);
    process.exit(1);
  }
})();

(async () => {
  const HOST = process.env.WEAVIATE_HOST || "localhost:8080"

  console.log("Weaviate", HOST);

  const client = weaviate.client({
    scheme: "http",
    host: HOST
  });

  try {
    const schema = await client.schema.getter().do();

    const className = "ProductV1";

    const classExists = schema.classes?.some((c) => c.class === className);

    if (!classExists) {
      await client.schema
        .classCreator()
        .withClass({
          class: className,
          description: "Product catalog entry",
          vectorizer: 'none',
          properties: [
            { name: "group_id", dataType: ["text"] },
            { name: "state", dataType: ["text"] },
            { name: "moderated", dataType: ["boolean"] },
            { name: "seller_id", dataType: ["text"] },
            { name: "thumbnail_url", dataType: ["text"] },
            { name: "name", dataType: ["text"] },
            { name: "price", dataType: ["int"] },
            { name: "sku", dataType: ["text"] },
            { name: "model", dataType: ["text"] },
            { name: "brand", dataType: ["text"] },
            { name: "description", dataType: ["text"] },
            { name: "category", dataType: ["text"] },
            { name: "bullet_list", dataType: ["text[]"] },
            { name: "color", dataType: ["text"] },
            { name: "condition_", dataType: ["text"] },
            { name: "country", dataType: ["text"] },
            { name: "origin", dataType: ["text"] },
            { name: "city", dataType: ["text"] },
            { name: "postal", dataType: ["text"] },
            { name: "discount", dataType: ["boolean"] },
            { name: "discount_value", dataType: ["int"] },
            { name: "created_at", dataType: ["number"] },
            { name: "updated_at", dataType: ["number"] },
            { name: "schema_v", dataType: ["int"] },
          ],
        })
        .do();

      console.log(`✅ Weaviate schema ${className} created.`);
    } else {
      console.log(`ℹ️ Weaviate schema ${className} already exists.`);
    }
  } catch (error) {
    console.error("❌ Error preparing Weaviate schema:", error);
    throw error;
  }
})();
