import crypto from "node:crypto";
import { ABLECT_PUBLIC_KEY_PEM, getMachineId } from "./license.js";
import { hashPassword } from "./password-service.js";

export async function resetPasswordWithSupportToken(pool, token, newPassword) {
  if (ABLECT_PUBLIC_KEY_PEM.includes("REPLACE_WITH")) throw new Error("ABLECT support public key is not configured.");
  const [payloadText, signatureText] = String(token).split(".");
  if (!payloadText || !signatureText) throw new Error("Invalid recovery token.");
  const signature = Buffer.from(signatureText, "base64url");
  if (!crypto.verify(null, Buffer.from(payloadText, "utf8"), ABLECT_PUBLIC_KEY_PEM, signature)) throw new Error("Recovery token signature is invalid.");
  const payload = JSON.parse(Buffer.from(payloadText, "base64url").toString("utf8"));
  if (payload.machineId !== getMachineId()) throw new Error("Recovery token is for a different machine.");
  if (!payload.expiresAt || new Date(payload.expiresAt).getTime() <= Date.now()) throw new Error("Recovery token has expired.");
  if (!payload.username) throw new Error("Recovery token has no target user.");
  const [result] = await pool.query(`UPDATE users SET password_hash=? WHERE username=? AND is_active=TRUE`, [hashPassword(newPassword), payload.username]);
  if (!result.affectedRows) throw new Error("Target user was not found.");
  await pool.query(`DELETE s FROM user_sessions s JOIN users u ON u.id=s.user_id WHERE u.username=?`, [payload.username]);
  return { reset: true, username: payload.username, expiresAt: payload.expiresAt };
}
