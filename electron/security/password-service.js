import crypto from "node:crypto";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function hashPassword(password) {
  if (typeof password !== "string" || password.length < 10) throw new Error("Password must contain at least 10 characters.");
  const N = 16384;
  const r = 8;
  const p = 1;
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, 64, { N, r, p, maxmem: 128 * N * r + 1024 * 1024 });
  return `scrypt$${N}$${r}$${p}$${salt.toString("base64")}$${key.toString("base64")}`;
}

function verifyPassword(password, encoded) {
  const [algorithm, n, r, p, saltBase64, keyBase64] = String(encoded).split("$");
  if (algorithm !== "scrypt" || !saltBase64 || !keyBase64) return false;
  const expected = Buffer.from(keyBase64, "base64");
  const actual = crypto.scryptSync(password, Buffer.from(saltBase64, "base64"), expected.length, { N: Number(n), r: Number(r), p: Number(p), maxmem: 128 * Number(n) * Number(r) + 1024 * 1024 });
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

export async function changePassword(pool, sessionToken, currentPassword, newPassword) {
  if (!sessionToken) throw new Error("Your session has expired. Sign in again.");
  const tokenHash = hashToken(sessionToken);
  const [rows] = await pool.query(
    `SELECT u.id, u.password_hash FROM user_sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>NOW() AND u.is_active=TRUE LIMIT 1`,
    [tokenHash],
  );
  const user = rows[0];
  if (!user || !verifyPassword(currentPassword, user.password_hash)) throw new Error("Current password is incorrect.");
  const passwordHash = hashPassword(newPassword);
  await pool.query(`UPDATE users SET password_hash=? WHERE id=?`, [passwordHash, user.id]);
  await pool.query(`DELETE FROM user_sessions WHERE user_id=? AND token_hash<>?`, [user.id, tokenHash]);
  return { changed: true };
}
