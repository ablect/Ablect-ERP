import crypto from "node:crypto";

const SESSION_TTL_HOURS = 12;

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function verifyPassword(password, encoded) {
  const [algorithm, n, r, p, saltBase64, keyBase64] = String(encoded).split("$");
  if (algorithm !== "scrypt" || !saltBase64 || !keyBase64) return false;

  const salt = Buffer.from(saltBase64, "base64");
  const expected = Buffer.from(keyBase64, "base64");
  const actual = crypto.scryptSync(password, salt, expected.length, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
    maxmem: 128 * Number(n) * Number(r) + 1024 * 1024,
  });
  return crypto.timingSafeEqual(actual, expected);
}

export function createAuthRepository(pool) {
  return {
    async login(identifier, password) {
      const [rows] = await pool.query(
        `SELECT u.id, u.username, u.email, u.password_hash, u.full_name, u.role,
                u.role_id, u.is_active,
                r.name AS role_name
           FROM users u
           LEFT JOIN roles r ON r.id = u.role_id
          WHERE (LOWER(u.username) = LOWER(?) OR LOWER(COALESCE(u.email, '')) = LOWER(?))
            AND u.is_active = TRUE
          LIMIT 1`,
        [identifier, identifier],
      );
      const user = rows[0];
      if (!user || !verifyPassword(password, user.password_hash)) {
        throw new Error("Invalid login details.");
      }

      const token = crypto.randomBytes(32).toString("hex");
      const tokenHash = hashToken(token);
      const expiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000);

      await pool.query(
        `INSERT INTO user_sessions (user_id, token_hash, expires_at)
         VALUES (?, ?, ?)`,
        [user.id, tokenHash, expiresAt],
      );

      const [permissions] = await pool.query(
        `SELECT module_name, can_view, can_create, can_edit, can_delete
           FROM permissions
          WHERE role_id = ?`,
        [user.role_id],
      );

      return {
        token,
        expiresAt: expiresAt.toISOString(),
        user: {
          id: String(user.id),
          name: user.full_name,
          email: user.email || user.username,
          role: user.role_name || user.role,
          roleId: user.role_id ? String(user.role_id) : null,
          permissions: permissions.map((permission) => ({
            module: permission.module_name,
            view: Boolean(permission.can_view),
            create: Boolean(permission.can_create),
            edit: Boolean(permission.can_edit),
            delete: Boolean(permission.can_delete),
          })),
        },
      };
    },

    async validateSession(token) {
      if (!token) return null;
      const tokenHash = hashToken(token);
      const [rows] = await pool.query(
        `SELECT u.id, u.username, u.email, u.full_name, u.role, u.role_id,
                r.name AS role_name
           FROM user_sessions s
           JOIN users u ON u.id = s.user_id
           LEFT JOIN roles r ON r.id = u.role_id
          WHERE s.token_hash = ? AND s.expires_at > NOW() AND u.is_active = TRUE
          LIMIT 1`,
        [tokenHash],
      );
      const user = rows[0];
      if (!user) return null;

      await pool.query(`UPDATE user_sessions SET last_seen_at = NOW() WHERE token_hash = ?`, [tokenHash]);
      const [permissions] = await pool.query(
        `SELECT module_name, can_view, can_create, can_edit, can_delete FROM permissions WHERE role_id = ?`,
        [user.role_id],
      );
      return {
        id: String(user.id),
        name: user.full_name,
        email: user.email || user.username,
        role: user.role_name || user.role,
        roleId: user.role_id ? String(user.role_id) : null,
        permissions: permissions.map((permission) => ({
          module: permission.module_name,
          view: Boolean(permission.can_view),
          create: Boolean(permission.can_create),
          edit: Boolean(permission.can_edit),
          delete: Boolean(permission.can_delete),
        })),
      };
    },

    async logout(token) {
      if (!token) return;
      await pool.query(`DELETE FROM user_sessions WHERE token_hash = ?`, [hashToken(token)]);
    },

    async cleanupSessions() {
      await pool.query(`DELETE FROM user_sessions WHERE expires_at <= NOW()`);
    },
  };
}
