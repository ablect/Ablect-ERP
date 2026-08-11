import mysql from "mysql2/promise";

export async function ensureDatabaseExists(config) {
  const connection = await mysql.createConnection({ host: config.host, port: config.port, user: config.adminUser || config.user, password: config.adminPassword ?? config.password });
  try {
    const databaseName = String(config.database).replace(/`/g, "``");
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  } finally { await connection.end(); }
}

export function createDatabasePool(config) {
  return mysql.createPool({ host: config.host, port: config.port, user: config.user, password: config.password, database: config.database, waitForConnections: true, connectionLimit: config.connectionLimit ?? 10, queueLimit: 0, charset: "utf8mb4", enableKeepAlive: true, keepAliveInitialDelay: 0, decimalNumbers: true });
}

export async function testDatabaseConnection(pool) {
  const connection = await pool.getConnection();
  try { await connection.ping(); } finally { connection.release(); }
}
