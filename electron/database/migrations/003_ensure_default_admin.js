const DEFAULT_ADMIN_PASSWORD_HASH = "scrypt$16384$8$1$O2YTgmjwigSfropPmfGOkg==$Ds9GY77XtlfkdqQVvwn8t4qq6fzD0v07Nesyz+D2Tvx9S9QMhPmXd3On9jsGhfPp/9WmiBtgvR2RMIwtgyI1oQ==";

/**
 * Repairs the bootstrap administrator for existing installations.
 * The migration is deterministic for the development bootstrap account and
 * does not alter other application users.
 */
export async function up(connection) {
  const [[admin]] = await connection.query(
    `SELECT id FROM users
      WHERE LOWER(username) = 'admin@ablect.local'
         OR LOWER(COALESCE(email, '')) = 'admin@ablect.local'
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
      ["admin@ablect.local", "admin@ablect.local", DEFAULT_ADMIN_PASSWORD_HASH, "ABLECT Administrator", role.id],
    );
  } else {
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

  await connection.query(`DELETE FROM user_sessions WHERE expires_at <= NOW()`);
}
