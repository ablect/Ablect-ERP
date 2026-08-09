import fs from "node:fs/promises";

/**
 * Initialize the minimum shared schema required by the ERP runtime.
 *
 * The schema is additive: every table uses IF NOT EXISTS, so starting a newer
 * application build does not drop a client's existing data.
 */
export async function initializeDatabase(pool, schemaPath) {
  const sql = await fs.readFile(schemaPath, "utf8");
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
