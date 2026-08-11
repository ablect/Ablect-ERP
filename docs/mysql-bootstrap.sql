-- Run once as MySQL administrator. Replace the password before use.
CREATE DATABASE IF NOT EXISTS ablect_business_suite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'ablect_app'@'localhost' IDENTIFIED BY 'REPLACE_WITH_A_LONG_RANDOM_PASSWORD';
CREATE USER IF NOT EXISTS 'ablect_app'@'127.0.0.1' IDENTIFIED BY 'REPLACE_WITH_A_LONG_RANDOM_PASSWORD';

GRANT ALL PRIVILEGES ON ablect_business_suite.* TO 'ablect_app'@'localhost';
GRANT ALL PRIVILEGES ON ablect_business_suite.* TO 'ablect_app'@'127.0.0.1';
FLUSH PRIVILEGES;
