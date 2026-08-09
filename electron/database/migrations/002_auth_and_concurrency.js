import crypto from "node:crypto";

const DEFAULT_ADMIN_PASSWORD_HASH = "scrypt$16384$8$1$VaG5yUeglgZGXCOFGVjAcQ==$sIgEilVVOb4ZwvBLdBXwGP9wO5JIjH3mF4HRacr40P0C+K+MM/ddLSYJLRoq24ItIUXx4ErfuyKAnbxcLQA2dw==";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function columnExists(connection, tableName, columnName) {
  const [[row]] = await connection.query(
    `SELECT 1 AS present FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?
      LIMIT 1`,
    [tableName, columnName],
  );
  return Boolean(row);
}

async function indexExists(connection, tableName, indexName) {
  const [[row]] = await connection.query(
    `SELECT 1 AS present FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?
      LIMIT 1`,
    [tableName, indexName],
  );
  return Boolean(row);
}

async function foreignKeyExists(connection, tableName, constraintName) {
  const [[row]] = await connection.query(
    `SELECT 1 AS present FROM information_schema.TABLE_CONSTRAINTS
      WHERE CONSTRAINT_SCHEMA = DATABASE() AND TABLE_NAME = ?
        AND CONSTRAINT_NAME = ? AND CONSTRAINT_TYPE = 'FOREIGN KEY'
      LIMIT 1`,
    [tableName, constraintName],
  );
  return Boolean(row);
}

export async function up(connection) {
  if (!(await columnExists(connection, "users", "email"))) {
    await connection.query(`ALTER TABLE users ADD COLUMN email VARCHAR(255) NULL AFTER username`);
  }
  if (!(await columnExists(connection, "users", "role_id"))) {
    await connection.query(`ALTER TABLE users ADD COLUMN role_id BIGINT UNSIGNED NULL AFTER role`);
  }
  if (!(await indexExists(connection, "users", "idx_users_role"))) {
    await connection.query(`ALTER TABLE users ADD KEY idx_users_role (role_id)`);
  }
  if (!(await indexExists(connection, "users", "uq_users_email"))) {
    await connection.query(`ALTER TABLE users ADD UNIQUE KEY uq_users_email (email)`);
  }
  if (!(await foreignKeyExists(connection, "users", "fk_users_role"))) {
    await connection.query(
      `ALTER TABLE users ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id)`,
    );
  }

  await connection.query(`
    CREATE TABLE IF NOT EXISTS user_sessions (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id BIGINT UNSIGNED NOT NULL,
      token_hash CHAR(64) NOT NULL,
      expires_at DATETIME NOT NULL,
      last_seen_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_session_token (token_hash),
      KEY idx_session_user (user_id),
      KEY idx_session_expiry (expires_at),
      CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS stock_locks (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      product_id BIGINT UNSIGNED NOT NULL,
      warehouse_id BIGINT UNSIGNED NOT NULL,
      quantity DECIMAL(15,3) NOT NULL,
      reference_type VARCHAR(80) NOT NULL,
      reference_id VARCHAR(120) NOT NULL,
      expires_at DATETIME NULL,
      created_by BIGINT UNSIGNED NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY idx_stock_lock_product_warehouse (product_id, warehouse_id),
      KEY idx_stock_lock_reference (reference_type, reference_id),
      KEY idx_stock_lock_expiry (expires_at),
      CONSTRAINT fk_stock_lock_product FOREIGN KEY (product_id) REFERENCES products(id),
      CONSTRAINT fk_stock_lock_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
      CONSTRAINT fk_stock_lock_user FOREIGN KEY (created_by) REFERENCES users(id)
    ) ENGINE=InnoDB
  `);

  const [roles] = await connection.query(`SELECT id, name FROM roles`);
  const roleIds = new Map(roles.map((role) => [role.name, role.id]));

  await connection.query(
    `UPDATE users SET role_id = COALESCE(role_id, ?) WHERE role = 'Administrator'`,
    [roleIds.get("Administrator") ?? null],
  );

  const modules = [
    "dashboard", "sales", "products", "inventory", "warehouse", "purchases",
    "suppliers", "customers", "crm", "hr", "payroll", "reports", "users", "settings",
  ];
  const roleMatrix = {
    Administrator: { all: true },
    Manager: { all: true, deny: ["users", "settings"] },
    Cashier: { allow: { sales: ["view", "create"], customers: ["view", "create"], products: ["view"] } },
    "Inventory Clerk": { allow: { products: ["view", "create", "edit"], inventory: ["view", "create", "edit"], warehouse: ["view", "create", "edit"], purchases: ["view"], suppliers: ["view"] } },
    "HR Officer": { allow: { hr: ["view", "create", "edit"], payroll: ["view"], users: ["view"] } },
    "Sales Representative": { allow: { sales: ["view", "create", "edit"], customers: ["view", "create", "edit"], crm: ["view", "create", "edit"], products: ["view"] } },
  };
  const actions = ["view", "create", "edit", "delete"];

  for (const [roleName, roleConfig] of Object.entries(roleMatrix)) {
    const roleId = roleIds.get(roleName);
    if (!roleId) continue;
    for (const moduleName of modules) {
      const allow = roleConfig.all
        ? actions
        : (roleConfig.allow?.[moduleName] ?? []);
      const denied = roleConfig.deny?.includes(moduleName);
      await connection.query(
        `INSERT INTO permissions (role_id, module_name, can_view, can_create, can_edit, can_delete)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           can_view = VALUES(can_view), can_create = VALUES(can_create),
           can_edit = VALUES(can_edit), can_delete = VALUES(can_delete)`,
        [roleId, moduleName, !denied && allow.includes("view"), !denied && allow.includes("create"), !denied && allow.includes("edit"), !denied && allow.includes("delete")],
      );
    }
  }

  const [[existingAdmin]] = await connection.query(
    `SELECT id FROM users WHERE username = 'admin@ablect.local' OR email = 'admin@ablect.local' LIMIT 1`,
  );
  if (!existingAdmin) {
    await connection.query(
      `INSERT INTO users (username, email, password_hash, full_name, role, role_id, is_active)
       VALUES (?, ?, ?, ?, 'Administrator', ?, TRUE)`,
      ["admin@ablect.local", "admin@ablect.local", DEFAULT_ADMIN_PASSWORD_HASH, "ABLECT Administrator", roleIds.get("Administrator") ?? null],
    );
  } else {
    await connection.query(
      `UPDATE users SET email = COALESCE(email, 'admin@ablect.local'), role_id = COALESCE(role_id, ?)
       WHERE id = ?`,
      [roleIds.get("Administrator") ?? null, existingAdmin.id],
    );
  }

  await connection.query(`DELETE FROM user_sessions WHERE expires_at < NOW()`);
  void hashToken;
}
