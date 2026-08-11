# Ablect Business Suite V1.0 commercial deployment

## Architecture decision

The current `feat/modern-sales-pos-next` branch is an Electron desktop application with a React/TypeScript renderer and a Node/Electron main process using `mysql2`. It is not a Python backend and it does not use PyInstaller. Therefore V1.0 must be packaged with Electron Builder. Introducing a second Python/MySQL runtime would create a second backend and violate the existing ERP architecture.

## 1. Invoice sequencing

The authoritative invoice number is generated in `electron/database/sales-service.js` from the transactional `sales_orders.id` auto-increment value. The renderer's `INV-00001` style number is only a preview. The checkout payload never gets to choose the permanent invoice number.

The transaction locks the product rows, validates stock, inserts the sale, derives `INV-${insertId.padStart(5,'0')}`, inserts sale lines, decreases stock, writes stock movements and audit information, then commits. Any failure rolls the entire sale back. Concurrent cashiers therefore cannot claim the same permanent invoice number.

Important: auto-increment IDs can contain gaps after a rolled-back transaction. This is intentional and safer than trying to reuse a number. Uniqueness and monotonicity matter more than gap-free numbering for an accounting system.

## 2. Passwords and support recovery

Passwords use salted Node `scrypt` hashes in the current Electron backend. `electron/security/password-service.js` provides an authenticated password-change operation.

Do not ship a hardcoded master password. A hardcoded master key is extractable from a desktop executable and becomes a universal customer bypass. For ABLECT support, use a signed recovery package/utility: generate an Ed25519 key pair outside the customer application, embed only the public key, and keep the private key offline. A recovery token should contain the customer machine ID, target user, expiry, nonce and requested reset operation and must be signed by the ABLECT private key. Never put the signing private key in the repository or installer.

If a separate Python service is ever introduced in a future release, PyArmor can be used before packaging, for example:

```powershell
python -m pip install pyarmor
pyarmor gen --output build-obfuscated backend
```

That command is not part of the current V1 build because this branch has no Python backend.

## 3. MySQL startup and first run

`electron/database/db.js` first checks whether the configured database exists. If it does not, it creates it with the configured bootstrap credentials. The normal application pool then connects using the restricted application account. Migrations build the schema and seed system roles/admin data.

Recommended production credentials:

- `ADMIN_USER`: temporary MySQL administrator used only to create the database.
- `ADMIN_PASSWORD`: temporary administrator password.
- `USER`: restricted `ablect_app` account with privileges only on `ablect_business_suite`.
- Do not run the ERP day-to-day using MySQL `root`.

After installation, remove the bootstrap password from the client configuration where possible. Keep the application account password separate from the MySQL administrator password.

### MySQL choice

For V1, install MySQL 8.x or MariaDB as a Windows service rather than shipping XAMPP. XAMPP is convenient for development but is not a good commercial dependency. A fully standalone MariaDB sidecar can be added later, but it requires service lifecycle management, secure initialization, upgrade/migration handling, backup/restore and uninstall handling. Do not silently bundle an unmanaged database server in V1 without those controls.

## 4. Paths in packaged Electron

The PyInstaller `sys._MEIPASS` pattern is not applicable. Electron uses `app.getAppPath()` for packaged application resources and `app.getPath('userData')` for writable per-installation data.

Current rules:

- Read-only application assets: `path.join(app.getAppPath(), ...)`
- React production entry: `path.join(app.getAppPath(), 'dist', 'index.html')`
- Client config: `%APPDATA%/AblectBusinessSuite/client-config.json`
- Printer profile: `%APPDATA%/AblectBusinessSuite/hardware-config.json`
- Error log: `%APPDATA%/AblectBusinessSuite/error_log.txt`
- License: `%APPDATA%/AblectBusinessSuite/license.json`
- Product uploads should be stored under `app.getPath('userData')`, not inside `app.asar`.

## 5. Silent error logging

`electron/logging.js` writes JSON lines to `%APPDATA%/AblectBusinessSuite/error_log.txt`, rotates at 5 MB and retains five generations. Unhandled exceptions, unhandled promise rejections, database startup errors and IPC failures are recorded. Packaged Windows builds use no visible developer console.

When troubleshooting a customer installation, ask for the contents of the error log rather than enabling a public debug endpoint.

## 6. First-run wizard

`src/components/setup/FirstRunWizard.tsx` is shown when the database has no products, the bootstrap administrator still exists, or no printer profile has been configured. It collects:

1. Client business name.
2. Main administrator account and new password.
3. First Xprinter connection profile.
4. First product.

The wizard stores the printer profile and client branding in `%APPDATA%/AblectBusinessSuite`. It does not add another database table.

## 7. Branding and licensing

The existing client configuration already feeds the business name and logo into the login UI. The new system gate checks an offline signed license before rendering the ERP application in a packaged build.

### License payload

Use a JSON payload similar to:

```json
{
  "licenseId": "ABS-2026-000001",
  "customerName": "Example Hotel",
  "machineId": "<sha256 machine id>",
  "expiresAt": "2027-08-11T23:59:59.000Z"
}
```

Sign the exact JSON bytes with the ABLECT Ed25519 private key. The installed file should contain:

```json
{
  "payload": "<base64url or exact signed JSON payload>",
  "signature": "<base64url Ed25519 signature>"
}
```

The application verifies the signature, machine ID and expiry locally. Only the public key is embedded in the application.

Before the commercial build, replace `REPLACE_WITH_ABLECT_ED25519_PUBLIC_KEY` in `electron/security/license.js` with the real ABLECT public key. Keep the private signing key offline.

The current code deliberately allows development builds without a license and requires a valid license for packaged builds.

## 8. Windows build

This repository already uses Electron Builder. Do not create an `app.spec` PyInstaller file for this project.

Development:

```powershell
npm install
npm run dev
```

Production build:

```powershell
npm ci
npm run build
npm run package:win
```

The NSIS installer is written to `release/` and is named approximately:

```text
Ablect-Business-Suite-<version>-Setup.exe
```

The existing `electron-builder.yml` bundles `dist/**`, `electron/**` and `package.json` into the Electron application and creates an NSIS installer.

## Release checklist

Before shipping V1.0:

- Build on a clean Windows machine.
- Install MySQL/MariaDB and create the restricted `ablect_app` account.
- Verify database auto-creation and migrations.
- Start the installer with an empty database.
- Complete the first-run wizard.
- Create two or more test products.
- Complete at least 20 consecutive sales and verify invoice IDs are unique.
- Run two concurrent checkout tests.
- Verify a failed checkout rolls back stock and sale rows.
- Verify the next invoice preview advances after checkout without refreshing.
- Verify login, session expiry and password change.
- Verify invalid, expired and wrong-machine licenses lock the dashboard.
- Verify the error log is created under `%APPDATA%/AblectBusinessSuite`.
- Verify the packaged app loads `dist/index.html` without Vite running.
- Verify the installer works on a clean Windows 10/11 machine.
- Back up and restore the customer's MySQL database before final handover.

## Support data locations

```text
%APPDATA%\AblectBusinessSuite\client-config.json
%APPDATA%\AblectBusinessSuite\hardware-config.json
%APPDATA%\AblectBusinessSuite\license.json
%APPDATA%\AblectBusinessSuite\error_log.txt
```

Do not delete the database or these files during troubleshooting unless a backup and customer approval exist.
