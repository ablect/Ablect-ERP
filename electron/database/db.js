import mysql from "mysql2/promise";

export async function ensureDatabaseExists(config) {
  const databaseName = String(config.database).replace(/`/g, "``");

  // Prefer the normal application account first. This is important for
  // installations where the database already exists but the application
  // user is intentionally NOT a MySQL administrator. CREATE DATABASE IF NOT
  // EXISTS still requires CREATE privilege, so the old implementation could
  // fail startup even though the application database itself was perfectly
  // healthy.
  try {
    const appConnection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      connectTimeout: 5000,
    });
    try {
      await appConnection.ping();
      return;
    } finally {
      await appConnection.end();
    }
  } catch (applicationError) {
    // The application database may genuinely not exist yet. In that case,
    // fall through to the administrator connection below. If administrator
    // credentials are not configured, report the original failure together
    // with an actionable message.
    const adminUser = config.adminUser || config.user;
    const adminPassword = config.adminPassword ?? config.password;

    try {
      const adminConnection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: adminUser,
        password: adminPassword,
        connectTimeout: 5000,
      });
      try {
        await adminConnection.query(
          `CREATE DATABASE IF NOT EXISTS \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
        );
      } finally {
        await adminConnection.end();
      }
    } catch (adminError) {
      const appMessage = applicationError instanceof Error ? applicationError.message : String(applicationError);
      const adminMessage = adminError instanceof Error ? adminError.message : String(adminError);
      throw new Error(
        `Unable to access MySQL database '${config.database}'. Application connection failed: ${appMessage}. Administrator/database initialization failed: ${adminMessage}.`,
      );
    }
  }
}

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

export async function testDatabaseConnection(pool) {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
  } finally {
    connection.release();
  }
}
