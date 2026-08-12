CREATE TABLE IF NOT EXISTS client_settings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  business_name VARCHAR(255) NOT NULL,
  logo_path VARCHAR(1024) NULL,
  installation_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(80) NOT NULL DEFAULT 'cashier',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_username (username)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  barcode VARCHAR(120) NULL,
  sku VARCHAR(120) NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(120) NULL,
  unit VARCHAR(50) NULL,
  cost_price DECIMAL(15,2) NOT NULL DEFAULT 0,
  selling_price DECIMAL(15,2) NOT NULL DEFAULT 0,
  quantity DECIMAL(15,3) NOT NULL DEFAULT 0,
  minimum_stock DECIMAL(15,3) NOT NULL DEFAULT 5,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_barcode (barcode),
  UNIQUE KEY uq_products_sku (sku),
  KEY idx_products_name (name),
  KEY idx_products_category (category)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS warehouses (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(80) NOT NULL,
  address VARCHAR(500) NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_warehouses_code (code)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS stock_movements (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id BIGINT UNSIGNED NOT NULL,
  movement_type ENUM('IN','OUT','TRANSFER','ADJUSTMENT') NOT NULL,
  quantity DECIMAL(15,3) NOT NULL,
  source_warehouse_id BIGINT UNSIGNED NULL,
  destination_warehouse_id BIGINT UNSIGNED NULL,
  reference_type VARCHAR(80) NULL,
  reference_id VARCHAR(120) NULL,
  performed_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_stock_movements_product (product_id),
  KEY idx_stock_movements_created_at (created_at),
  CONSTRAINT fk_stock_product FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT fk_stock_source_warehouse FOREIGN KEY (source_warehouse_id) REFERENCES warehouses(id),
  CONSTRAINT fk_stock_destination_warehouse FOREIGN KEY (destination_warehouse_id) REFERENCES warehouses(id),
  CONSTRAINT fk_stock_user FOREIGN KEY (performed_by) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NULL,
  action VARCHAR(120) NOT NULL,
  entity_type VARCHAR(120) NULL,
  entity_id VARCHAR(120) NULL,
  details JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_audit_created_at (created_at),
  KEY idx_audit_user (user_id),
  CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;
