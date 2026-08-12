import fs from "node:fs/promises";

/**
 * Initialize one or more additive SQL schema files inside a single transaction.
 *
 * Every statement is parameter-free DDL/seed SQL owned by the application.
 * Files are executed in the order supplied so foreign-key dependencies are
 * created safely (base tables first, integrated ERP tables second).
 */
export async function initializeDatabase(pool, schemaPaths) {
  const paths = Array.isArray(schemaPaths) ? schemaPaths : [schemaPaths];
  const statements = [];

  for (const schemaPath of paths) {
    const sql = await fs.readFile(schemaPath, "utf8");
    statements.push(
      ...sql
        .split(/;\s*(?:\r?\n|$)/)
        .map((statement) => statement.trim())
        .filter(Boolean),
    );
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    for (const statement of statements) {
      await connection.query(statement);
    }
    await connection.commit();
    console.log(`MySQL database initialized (${statements.length} statements).`);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
