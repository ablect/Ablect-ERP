import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { app } from "electron";

const LICENSE_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----\nREPLACE_WITH_ABLECT_ED25519_PUBLIC_KEY\n-----END PUBLIC KEY-----`;

export function getMachineId() {
  const interfaces = Object.values(os.networkInterfaces()).flat().filter(Boolean);
  const macs = interfaces.map((item) => item.mac).filter((mac) => mac && mac !== "00:00:00:00:00:00").sort();
  return crypto.createHash("sha256").update(`${os.hostname()}|${macs.join("|")}`).digest("hex");
}

export async function validateLicense(userDataPath) {
  const machineId = getMachineId();
  if (!app.isPackaged) return { valid: true, reason: "development", machineId };
  if (LICENSE_PUBLIC_KEY_PEM.includes("REPLACE_WITH")) return { valid: false, reason: "license-public-key-not-configured", machineId };
  try {
    const raw = JSON.parse(await fs.readFile(path.join(userDataPath, "license.json"), "utf8"));
    const payload = typeof raw.payload === "string" ? raw.payload : JSON.stringify(raw.claims);
    const signature = Buffer.from(String(raw.signature), "base64url");
    if (!crypto.verify(null, Buffer.from(payload), LICENSE_PUBLIC_KEY_PEM, signature)) return { valid: false, reason: "invalid-signature", machineId };
    const claims = JSON.parse(payload);
    if (claims.machineId !== machineId) return { valid: false, reason: "machine-mismatch", machineId };
    if (!claims.expiresAt || new Date(claims.expiresAt).getTime() <= Date.now()) return { valid: false, reason: "expired", machineId };
    return { valid: true, reason: "active", machineId, licenseId: claims.licenseId, customerName: claims.customerName, expiresAt: claims.expiresAt };
  } catch {
    return { valid: false, reason: "license-file-missing-or-invalid", machineId };
  }
}
