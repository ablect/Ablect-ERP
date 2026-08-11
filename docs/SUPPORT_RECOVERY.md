# ABLECT support recovery

There is intentionally no hardcoded master password. Desktop applications can be inspected, so a hidden static key would eventually become a universal bypass.

V1 uses signed recovery tokens instead.

## 1. Generate the ABLECT signing key once

On an offline ABLECT support machine:

```powershell
openssl genpkey -algorithm ED25519 -out ablect-support-private.pem
openssl pkey -in ablect-support-private.pem -pubout -out ablect-support-public.pem
```

Keep `ablect-support-private.pem` offline. Put only the public key into `electron/security/license.js` before the commercial build.

## 2. Token payload

The support system should sign JSON containing:

```json
{
  "machineId": "<customer machine id>",
  "username": "admin@example.com",
  "expiresAt": "2026-08-11T20:00:00.000Z",
  "nonce": "<random value>"
}
```

The signature covers the exact UTF-8 JSON bytes. The token format consumed by the application is:

```text
base64url(payload-json).base64url(ed25519-signature)
```

## 3. Reset

The signed token is supplied to the support recovery IPC/bridge together with a new password. The application verifies:

- ABLECT signature
- machine ID
- expiry
- target username
- active user record

It then replaces the password hash and invalidates all existing sessions for that user.

Never email or store the private signing key with the customer installation.
