import fs from "node:fs/promises";
import path from "node:path";

/**
 * Initialize the minimum shared schema required by the ERP runtime.
 *
 * The schema is intentionally additive: every table uses IF NOT EXISTS so
 * existing client data is not dropped when the application starts.
 */
export async function initializeDatabase(pool) {
  const schemaPath = path.join(process.cwd(), "electron", "database", "schema.sql");
  const sql = await fs.readFile(schemaPath, "utf8");

  // MySQL can execute the complete script when multipleStatements is enabled,
  // but we deliberately keep it disabled on the pool. Split only on the simple
  // semicolon-delimited statements used by our checked-in schema file.
  const statements = sql
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    for (const statement of statements) {
      await connection.query(statement);
    }
    await connection.commit();
    console.log("MySQL database initialized.");
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
