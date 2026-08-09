import mysql from "mysql2/promise";

/**
 * Runtime database configuration loaded from the installation configuration.
 * The same build can therefore point at localhost or a MySQL server on the LAN.
 */
export function createDatabasePool(config) {
  return mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: config.connectionLimit ?? 10,
    queueLimit: 0,
    charset: "utf8mb4",
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    decimalNumbers: true,
  });
}

/**
 * Opens a connection and immediately releases it. This is deliberately kept
 * separate from schema initialization so startup can report a clean status.
 */
export async function testDatabaseConnection(pool) {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
  } finally {
    connection.release();
  }
}
