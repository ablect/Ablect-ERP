# ABLECT support recovery

There is intentionally no hardcoded master password. Desktop applications can be inspected, so a hidden static key would become a universal bypass.

V1 uses signed recovery tokens instead.

## Generate the ABLECT signing key once

On an offline ABLECT support machine:

```powershell
openssl genpkey -algorithm ED25519 -out ablect-support-private.pem
openssl pkey -in ablect-support-private.pem -pubout -out ablect-support-public.pem
```

Keep the private key offline. Put only the public key into `electron/security/license.js` before the commercial build.

## Token payload

The support system should sign JSON containing the customer machine ID, target username, expiry and a random nonce. The signature covers the exact UTF-8 JSON bytes.

Token format:

```text
base64url(payload-json).base64url(ed25519-signature)
```

The application verifies the ABLECT signature, machine ID, expiry, target username and active user record before changing the password and invalidating existing sessions.

Never store the private signing key in the customer installation, repository or installer.
