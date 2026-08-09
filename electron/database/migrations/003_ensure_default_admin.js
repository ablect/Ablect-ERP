const DEFAULT_ADMIN_PASSWORD_HASH = "scrypt$16384$8$1$VaG5yUeglgZGXCOFGVjAcQ==$sIgEilVVOb4ZwvBLdBXwGP9wO5JIjH3mF4HRacr40P0C+K+MM/ddLSYJLRoq24ItIUXx4ErfuyKAnbxcLQA2dw==";

/**
 * Repairs the bootstrap administrator for existing installations.
 *
 * Migration 002 only created the administrator when it did not already exist.
 * Older/local databases could therefore contain an admin row with a different
 * password or inactive state. This migration makes the documented development
 * credentials deterministic without changing other application users.
 */
export async function up(connection) {
  const [[admin]] = await connection.query(
    `SELECT id FROM users
      WHERE username = 'admin@ablect.local' OR email = 'admin@ablect.local'
      ORDER BY id ASC
      LIMIT 1`,
  );

  const [[role]] = await connection.query(
    `SELECT id FROM roles WHERE name = 'Administrator' LIMIT 1`,
  );

  if (!role?.id) {
    throw new Error("Administrator role is missing; database baseline is incomplete.");
  }

  if (!admin) {
    await connection.query(
      `INSERT INTO users
        (username, email, password_hash, full_name, role, role_id, is_active)
       VALUES (?, ?, ?, ?, 'Administrator', ?, TRUE)`,
      [
        "admin@ablect.local",
        "admin@ablect.local",
        DEFAULT_ADMIN_PASSWORD_HASH,
        "ABLECT Administrator",
        role.id,
      ],
    );
    return;
  }

  await connection.query(
    `UPDATE users
        SET username = 'admin@ablect.local',
            email = 'admin@ablect.local',
            password_hash = ?,
            full_name = COALESCE(NULLIF(full_name, ''), 'ABLECT Administrator'),
            role = 'Administrator',
            role_id = ?,
            is_active = TRUE
      WHERE id = ?`,
    [DEFAULT_ADMIN_PASSWORD_HASH, role.id, admin.id],
  );
}
