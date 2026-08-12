-- Run this script once as a MySQL administrator on the computer hosting the ERP database.
-- Do NOT put this administrator password into client-config.json.

CREATE DATABASE IF NOT EXISTS ablect_business_suite
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'ablect_app'@'localhost'
  IDENTIFIED BY 'CHANGE_THIS_TO_A_STRONG_LOCAL_PASSWORD';

CREATE USER IF NOT EXISTS 'ablect_app'@'192.168.1.%'
  IDENTIFIED BY 'CHANGE_THIS_TO_A_STRONG_LOCAL_PASSWORD';

GRANT ALL PRIVILEGES ON ablect_business_suite.* TO 'ablect_app'@'localhost';
GRANT ALL PRIVILEGES ON ablect_business_suite.* TO 'ablect_app'@'192.168.1.%';

FLUSH PRIVILEGES;

USE ablect_business_suite;

-- The application runs electron/database/schema.sql at startup to create or
-- upgrade the additive tables. Keeping database creation here prevents the
-- application account from needing global CREATE DATABASE privileges.
