const DEFAULT_ADMIN_PASSWORD_HASH = "scrypt$16384$8$1$afRYNI4woxzlYFFA8B8k6Q==$1yFQOQJ5HZbIDQ4UC0oB6uUV4guztVuwE9sqVD8D4aTLW44NN3278dGOG2IbAbDPtnufGKQv6JjaIwp8sZ5toQ==";

/**
 * Provides a deterministic development/admin account without overwriting
 * passwords chosen by an existing administrator.
 *
 * Default development credentials:
 *   admin@ablect.local / admin1234
 */
export async function up(connection) {
  const [[existingAdmin]] = await connection.query(
    `SELECT id, password_hash FROM users
      WHERE username = 'admin@ablect.local' OR email = 'admin@ablect.local'
      LIMIT 1`,
  );

  if (!existingAdmin) {
    const [[role]] = await connection.query(
      `SELECT id FROM roles WHERE name = 'Administrator' LIMIT 1`,
    );
    await connection.query(
      `INSERT INTO users
        (username, email, password_hash, full_name, role, role_id, is_active)
       VALUES (?, ?, ?, ?, 'Administrator', ?, TRUE)`,
      [
        "admin@ablect.local",
        "admin@ablect.local",
        DEFAULT_ADMIN_PASSWORD_HASH,
        "ABLECT Administrator",
        role?.id ?? null,
      ],
    );
    return;
  }

  // Only rotate the password when it is still the legacy bundled default.
  // A real administrator password is never overwritten.
  const legacyHash =
    "scrypt$16384$8$1$VaG5yUeglgZGXCOFGVjAcQ==$sIgEilVVOb4ZwvBLdBXwGP9wO5JIjH3mF4HRacr40P0C+K+MM/ddLSYJLRoq24ItIUXx4ErfuyKAnbxcLQA2dw==";

  if (existingAdmin.password_hash === legacyHash) {
    await connection.query(
      `UPDATE users SET password_hash = ? WHERE id = ?`,
      [DEFAULT_ADMIN_PASSWORD_HASH, existingAdmin.id],
    );
  }
}
