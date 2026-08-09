$ErrorActionPreference = "Stop"

$appUser = "ablect_app"
$appPassword = "AblectLocal!2026"
$database = "ablect_business_suite"
$projectRoot = Split-Path -Parent $PSScriptRoot
$configPath = Join-Path $projectRoot "client-config.json"

$mysql = Get-Command mysql.exe -ErrorAction SilentlyContinue
if (-not $mysql) {
  $candidates = @(
    "$env:ProgramFiles\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "$env:ProgramFiles\MySQL\MySQL Server 8.4\bin\mysql.exe",
    "$env:ProgramFiles\MariaDB 11.0\bin\mysql.exe",
    "$env:ProgramFiles\MariaDB 11.4\bin\mysql.exe"
  )
  $mysqlPath = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
  if ($mysqlPath) { $mysql = @{ Source = $mysqlPath } }
}

if (-not $mysql) {
  throw "mysql.exe was not found. Install MySQL/MariaDB and make sure mysql.exe is on PATH."
}

$mysqlExe = if ($mysql.Source) { $mysql.Source } else { $mysql.Path }

Write-Host "Configuring local MySQL for Ablect Business Suite..." -ForegroundColor Cyan
Write-Host "MySQL root credentials are used only for this setup command." -ForegroundColor Yellow

# IMPORTANT: use the actual database name in SQL. Do not escape the PowerShell
# variable marker with a backtick inside this double-quoted here-string.
$sql = @"
CREATE DATABASE IF NOT EXISTS $database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$appUser'@'localhost' IDENTIFIED BY '$appPassword';
ALTER USER '$appUser'@'localhost' IDENTIFIED BY '$appPassword';
CREATE USER IF NOT EXISTS '$appUser'@'127.0.0.1' IDENTIFIED BY '$appPassword';
ALTER USER '$appUser'@'127.0.0.1' IDENTIFIED BY '$appPassword';
CREATE USER IF NOT EXISTS '$appUser'@'::1' IDENTIFIED BY '$appPassword';
ALTER USER '$appUser'@'::1' IDENTIFIED BY '$appPassword';
CREATE USER IF NOT EXISTS '$appUser'@'%' IDENTIFIED BY '$appPassword';
ALTER USER '$appUser'@'%' IDENTIFIED BY '$appPassword';
GRANT ALL PRIVILEGES ON $database.* TO '$appUser'@'localhost';
GRANT ALL PRIVILEGES ON $database.* TO '$appUser'@'127.0.0.1';
GRANT ALL PRIVILEGES ON $database.* TO '$appUser'@'::1';
GRANT ALL PRIVILEGES ON $database.* TO '$appUser'@'%';
FLUSH PRIVILEGES;
"@

& $mysqlExe --protocol=tcp --host=127.0.0.1 --user=root -p -e $sql
if ($LASTEXITCODE -ne 0) {
  throw "MySQL setup failed. Check that the MySQL server is running and that the root password is correct."
}

# Verify the exact credentials and database access that Electron will use.
$oldMysqlPwd = $env:MYSQL_PWD
$env:MYSQL_PWD = $appPassword
try {
  & $mysqlExe --protocol=tcp --host=127.0.0.1 --port=3306 --user=$appUser --database=$database -e "SELECT DATABASE() AS database_name, CURRENT_USER() AS mysql_user;"
  if ($LASTEXITCODE -ne 0) {
    throw "The application user still cannot access '$database'."
  }
}
finally {
  if ($null -eq $oldMysqlPwd) {
    Remove-Item Env:MYSQL_PWD -ErrorAction SilentlyContinue
  } else {
    $env:MYSQL_PWD = $oldMysqlPwd
  }
}

$config = @{
  CLIENT_BUSINESS_NAME = "Ablect Business Suite"
  CLIENT_LOGO_PATH = ""
  INSTALLATION_DATE = (Get-Date -Format "yyyy-MM-dd")
  DATABASE = @{
    HOST = "127.0.0.1"
    PORT = 3306
    NAME = $database
    USER = $appUser
    PASSWORD = $appPassword
    CONNECTION_LIMIT = 10
  }
}

$config | ConvertTo-Json -Depth 5 | Set-Content -Path $configPath -Encoding UTF8

Write-Host "Local MySQL configuration is ready." -ForegroundColor Green
Write-Host "Database: $database"
Write-Host "User: $appUser"
Write-Host "Config: $configPath"
Write-Host "Default application login: admin@ablect.local / admin1234" -ForegroundColor Green
Write-Host "Run 'npm run dev' next." -ForegroundColor Green
