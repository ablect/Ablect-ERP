import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

function hashPassword(password) {
  if (typeof password !== "string" || password.length < 10) throw new Error("Password must contain at least 10 characters.");
  const N = 16384, r = 8, p = 1;
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, 64, { N, r, p, maxmem: 128 * N * r + 1024 * 1024 });
  return `scrypt$${N}$${r}$${p}$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function getFirstRunStatus(pool, userDataPath) {
  const [[users]] = await pool.query(`SELECT COUNT(*) count FROM users`);
  const [[products]] = await pool.query(`SELECT COUNT(*) count FROM products`);
  const [[settings]] = await pool.query(`SELECT business_name FROM client_settings WHERE id=1 LIMIT 1`);
  let hardwareConfigured = false;
  try { await fs.access(path.join(userDataPath, "hardware-config.json")); hardwareConfigured = true; } catch {}
  const [[bootstrap]] = await pool.query(`SELECT COUNT(*) count FROM users WHERE username='admin@ablect.local' AND full_name='ABLECT Administrator'`);
  return { needsSetup: Number(products.count) === 0 || !hardwareConfigured || Number(bootstrap.count) > 0, users: Number(users.count), products: Number(products.count), hardwareConfigured, businessName: settings?.business_name ?? "" };
}

export async function completeFirstRun(pool, userDataPath, payload) {
  const businessName = String(payload.businessName ?? "").trim();
  const fullName = String(payload.fullName ?? "").trim();
  const email = String(payload.email ?? "").trim().toLowerCase();
  const password = String(payload.password ?? "");
  if (!businessName || !fullName || !email || !password) throw new Error("Business name, administrator name, email and password are required.");
  const passwordHash = hashPassword(password);
  const hardware = { printerName: String(payload.printerName ?? "Xprinter"), connection: String(payload.connection ?? "USB"), address: String(payload.address ?? "") };
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [[admin]] = await connection.query(`SELECT id FROM users WHERE username='admin@ablect.local' OR email='admin@ablect.local' ORDER BY id LIMIT 1 FOR UPDATE`);
    if (admin) await connection.query(`UPDATE users SET username=?,email=?,password_hash=?,full_name=?,role='Administrator',is_active=TRUE WHERE id=?`, [email, email, passwordHash, fullName, admin.id]);
    else { const [[role]] = await connection.query(`SELECT id FROM roles WHERE name='Administrator' LIMIT 1`); await connection.query(`INSERT INTO users (username,email,password_hash,full_name,role,role_id,is_active) VALUES (?,?,?,?, 'Administrator',?,TRUE)`, [email, email, passwordHash, fullName, role?.id ?? null]); }
    await connection.query(`INSERT INTO client_settings (id,business_name,installation_date) VALUES (1,?,CURRENT_DATE) ON DUPLICATE KEY UPDATE business_name=VALUES(business_name)`, [businessName]);
    await connection.commit();
  } catch (error) { await connection.rollback(); throw error; } finally { connection.release(); }
  await fs.mkdir(userDataPath, { recursive: true });
  await fs.writeFile(path.join(userDataPath, "hardware-config.json"), JSON.stringify(hardware, null, 2), "utf8");
  const configPath = path.join(userDataPath, "client-config.json");
  let existing = {};
  try { existing = JSON.parse(await fs.readFile(configPath, "utf8")); } catch {}
  await fs.writeFile(configPath, JSON.stringify({ ...existing, CLIENT_BUSINESS_NAME: businessName, INSTALLATION_DATE: new Date().toISOString().slice(0, 10) }, null, 2), "utf8");
  return { completed: true };
}
