import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

/**
 * Ordered migration runner. Each file exports `up(connection, context)` and is
 * applied exactly once. This makes schema changes deterministic for packaged
 * client installations and safe to run on every application boot.
 */
export async function runMigrations(pool, appPath) {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version VARCHAR(120) NOT NULL,
        name VARCHAR(255) NOT NULL,
        applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (version)
      ) ENGINE=InnoDB
    `);

    const migrationDir = path.join(appPath, "electron", "database", "migrations");
    const entries = (await fs.readdir(migrationDir))
      .filter((name) => /^\d+_.+\.js$/.test(name))
      .sort();

    const [appliedRows] = await connection.query(
      `SELECT version FROM schema_migrations ORDER BY version ASC`,
    );
    const applied = new Set(appliedRows.map((row) => row.version));

    for (const fileName of entries) {
      const version = fileName.slice(0, fileName.indexOf("_"));
      if (applied.has(version)) continue;

      // Electron runs this code as native ESM. On Windows, `import()` does not
      // accept a raw absolute path such as C:\\...; convert it to a file:// URL.
      const migrationPath = path.join(migrationDir, fileName);
      const migration = await import(pathToFileURL(migrationPath).href);
      if (typeof migration.up !== "function") {
        throw new Error(`Migration ${fileName} does not export an up() function.`);
      }

      console.log(`Applying database migration ${version}: ${fileName}`);
      await migration.up(connection, { appPath });
      await connection.query(
        `INSERT INTO schema_migrations (version, name) VALUES (?, ?)`,
        [version, fileName],
      );
    }

    console.log(`Database migrations complete (${entries.length} known migrations).`);
  } finally {
    connection.release();
  }
}
