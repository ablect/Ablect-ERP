import fs from "node:fs/promises";
import path from "node:path";

/**
 * Baseline migration for existing Ablect Business Suite installations.
 *
 * We intentionally reuse the existing schema.sql and schema.erp.sql files
 * rather than duplicating hundreds of lines of DDL. The migration runner
 * records this migration in schema_migrations, so future schema changes are
 * additive, ordered and independently versioned.
 */
export async function up(connection, { appPath }) {
  const schemaPaths = [
    path.join(appPath, "electron", "database", "schema.sql"),
    path.join(appPath, "electron", "database", "schema.erp.sql"),
  ];

  for (const schemaPath of schemaPaths) {
    const sql = await fs.readFile(schemaPath, "utf8");
    const statements = sql
      .split(/;\s*(?:\r?\n|$)/)
      .map((statement) => statement.trim())
      .filter(Boolean);

    for (const statement of statements) {
      await connection.query(statement);
    }
  }
}
