import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

// Replace this public key during the ABLECT release process. Keep the matching
// Ed25519 private key offline and never ship it with the application.
const LICENSE_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----\nREPLACE_WITH_ABLECT_ED25519_PUBLIC_KEY\n-----END PUBLIC KEY-----`;

export function getMachineId() {
  const interfaces = Object.values(os.networkInterfaces()).flat().filter(Boolean);
  const macs = interfaces.map((item) => item.mac).filter((mac) => mac && mac !== "00:00:00:00:00:00").sort();
  return crypto.createHash("sha256").update(`${os.hostname()}|${macs.join("|")}`).digest("hex");
}

export async function validateLicense(userDataPath) {
  if (!process.versions.electron || !userDataPath) return { valid: false, reason: "desktop-runtime-required" };
  if (!LICENSE_PUBLIC_KEY_PEM.includes("BEGIN PUBLIC KEY") || LICENSE_PUBLIC_KEY_PEM.includes("REPLACE_WITH")) {
    return { valid: false, reason: "license-public-key-not-configured", machineId: getMachineId() };
  }

  try {
    const filePath = path.join(userDataPath, "license.json");
    const raw = JSON.parse(await fs.readFile(filePath, "utf8"));
    const payload = typeof raw.payload === "string" ? raw.payload : JSON.stringify(raw.claims);
    const signature = Buffer.from(String(raw.signature), "base64url");
    const validSignature = crypto.verify(null, Buffer.from(payload), LICENSE_PUBLIC_KEY_PEM, signature);
    if (!validSignature) return { valid: false, reason: "invalid-signature", machineId: getMachineId() };
    const claims = JSON.parse(payload);
    if (claims.machineId !== getMachineId()) return { valid: false, reason: "machine-mismatch", machineId: getMachineId() };
    if (!claims.expiresAt || new Date(claims.expiresAt).getTime() <= Date.now()) return { valid: false, reason: "expired", machineId: getMachineId() };
    return { valid: true, reason: "active", machineId: getMachineId(), licenseId: claims.licenseId, customerName: claims.customerName, expiresAt: claims.expiresAt };
  } catch {
    return { valid: false, reason: "license-file-missing-or-invalid", machineId: getMachineId() };
  }
}
