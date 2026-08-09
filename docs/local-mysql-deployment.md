# Ablect Business Suite: Local MySQL Deployment

This ERP build uses a local MySQL server as the system of record. There is no cloud synchronization in this deployment model.

## 1. Database host

Choose one Windows PC in the client's office as the database host. It can also run the ERP itself.

Install MySQL Server 8.x on that PC and create the database/user using `scripts/mysql/bootstrap.sql` as a MySQL administrator.

The application account should be limited to `ablect_business_suite`; do not use the MySQL root account from the ERP application.

## 2. Configure MySQL for LAN access

On Windows, MySQL normally uses `my.ini`. The exact location depends on the installation. MySQL documents that Windows installations commonly create `my.ini` in the MySQL installation directory.

Under `[mysqld]`, use:

```ini
[mysqld]
port=3306
bind-address=0.0.0.0
```

Restart the MySQL Windows service after changing the option file.

For stronger network isolation, replace `0.0.0.0` with the database host's fixed LAN IPv4 address, for example `192.168.1.20`.

## 3. Windows Firewall

Run PowerShell as Administrator on the database host:

```powershell
New-NetFirewallRule -DisplayName "Ablect Business Suite MySQL" -Direction Inbound -Protocol TCP -LocalPort 3306 -Action Allow -Profile Private -RemoteAddress LocalSubnet
```

This keeps the rule scoped to the Windows Private network profile and local subnet rather than exposing MySQL broadly.

If the client's network uses a different subnet, use that subnet instead of `LocalSubnet`.

## 4. Client configuration

During installation, create `client-config.json` in the Electron user-data directory, or set `ABLECT_CLIENT_CONFIG_PATH` to an administrator-managed configuration file.

Development can also use a project-root `client-config.json` copied from `client-config.example.json`.

Example for a single-PC installation:

```json
{
  "CLIENT_BUSINESS_NAME": "Example Supermarket",
  "CLIENT_LOGO_PATH": "C:/ProgramData/AblectBusinessSuite/client/logo.png",
  "INSTALLATION_DATE": "2026-08-09",
  "DATABASE": {
    "HOST": "127.0.0.1",
    "PORT": 3306,
    "NAME": "ablect_business_suite",
    "USER": "ablect_app",
    "PASSWORD": "the-client-specific-app-password",
    "CONNECTION_LIMIT": 10
  }
}
```

Example for a multi-PC LAN installation where the database host is `192.168.1.20`:

```json
{
  "CLIENT_BUSINESS_NAME": "Example Supermarket",
  "CLIENT_LOGO_PATH": "C:/ProgramData/AblectBusinessSuite/client/logo.png",
  "INSTALLATION_DATE": "2026-08-09",
  "DATABASE": {
    "HOST": "192.168.1.20",
    "PORT": 3306,
    "NAME": "ablect_business_suite",
    "USER": "ablect_app",
    "PASSWORD": "the-client-specific-app-password",
    "CONNECTION_LIMIT": 10
  }
}
```

## 5. Test the LAN before starting the ERP

On the database host:

```powershell
ipconfig
netstat -ano | findstr :3306
```

On another PC on the same LAN:

```powershell
Test-NetConnection 192.168.1.20 -Port 3306
```

A successful test should show `TcpTestSucceeded : True`.

Then test the MySQL account from the client PC:

```powershell
mysql -h 192.168.1.20 -P 3306 -u ablect_app -p ablect_business_suite
```

## 6. Start Ablect Business Suite

Install the dependencies once on the development/build machine:

```powershell
npm install
```

Then:

```powershell
npm run dev
```

The Electron main process loads the client configuration at boot, creates a MySQL connection pool, tests the connection, and runs the additive schema initializer. The renderer receives only safe client-branding and database-status information through the isolated Electron preload bridge.

## 7. Important installation rule

Do not edit React source code for every customer. Change only the customer's local configuration and logo files. The application name remains `Ablect Business Suite` and the footer remains `Powered by Ablect Technologies`.
