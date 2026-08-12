CREATE TABLE IF NOT EXISTS customers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_code VARCHAR(80) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NULL,
  phone VARCHAR(50) NULL,
  email VARCHAR(255) NULL,
  address VARCHAR(500) NULL,
  customer_type ENUM('RETAIL','WHOLESALE','CORPORATE','HOSPITALITY') NOT NULL DEFAULT 'RETAIL',
  loyalty_points DECIMAL(15,2) NOT NULL DEFAULT 0,
  credit_limit DECIMAL(15,2) NOT NULL DEFAULT 0,
  credit_balance DECIMAL(15,2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_customers_code (customer_code),
  KEY idx_customers_name (full_name),
  KEY idx_customers_phone (phone),
  KEY idx_customers_business (business_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS suppliers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  supplier_code VARCHAR(80) NOT NULL,
  name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255) NULL,
  phone VARCHAR(50) NULL,
  email VARCHAR(255) NULL,
  address VARCHAR(500) NULL,
  lead_time_days INT UNSIGNED NOT NULL DEFAULT 0,
  payment_terms VARCHAR(120) NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_suppliers_code (supplier_code),
  KEY idx_suppliers_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS purchase_orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  po_number VARCHAR(80) NOT NULL,
  supplier_id BIGINT UNSIGNED NOT NULL,
  warehouse_id BIGINT UNSIGNED NOT NULL,
  status ENUM('DRAFT','ORDERED','PARTIALLY_RECEIVED','RECEIVED','CANCELLED') NOT NULL DEFAULT 'DRAFT',
  order_date DATE NOT NULL,
  expected_date DATE NULL,
  subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
  tax DECIMAL(15,2) NOT NULL DEFAULT 0,
  total DECIMAL(15,2) NOT NULL DEFAULT 0,
  notes TEXT NULL,
  created_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_purchase_orders_number (po_number),
  KEY idx_purchase_orders_supplier (supplier_id),
  KEY idx_purchase_orders_warehouse (warehouse_id),
  KEY idx_purchase_orders_status (status),
  CONSTRAINT fk_po_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  CONSTRAINT fk_po_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
  CONSTRAINT fk_po_user FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS purchase_order_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  purchase_order_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  quantity DECIMAL(15,3) NOT NULL,
  received_quantity DECIMAL(15,3) NOT NULL DEFAULT 0,
  unit_cost DECIMAL(15,2) NOT NULL DEFAULT 0,
  line_total DECIMAL(15,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_po_items_po (purchase_order_id),
  KEY idx_po_items_product (product_id),
  CONSTRAINT fk_po_item_po FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id),
  CONSTRAINT fk_po_item_product FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS warehouse_stock (
  warehouse_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  quantity DECIMAL(15,3) NOT NULL DEFAULT 0,
  reserved_quantity DECIMAL(15,3) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (warehouse_id, product_id),
  CONSTRAINT fk_ws_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
  CONSTRAINT fk_ws_product FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sales_orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  sale_number VARCHAR(80) NOT NULL,
  customer_id BIGINT UNSIGNED NULL,
  warehouse_id BIGINT UNSIGNED NULL,
  status ENUM('DRAFT','HELD','COMPLETED','CANCELLED','REFUNDED') NOT NULL DEFAULT 'DRAFT',
  payment_status ENUM('UNPAID','PARTIAL','PAID','REFUNDED') NOT NULL DEFAULT 'UNPAID',
  payment_method VARCHAR(50) NULL,
  subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
  discount DECIMAL(15,2) NOT NULL DEFAULT 0,
  tax DECIMAL(15,2) NOT NULL DEFAULT 0,
  total DECIMAL(15,2) NOT NULL DEFAULT 0,
  paid_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  created_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sales_number (sale_number),
  KEY idx_sales_customer (customer_id),
  KEY idx_sales_created (created_at),
  CONSTRAINT fk_sales_customer FOREIGN KEY (customer_id) REFERENCES customers(id),
  CONSTRAINT fk_sales_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
  CONSTRAINT fk_sales_user FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sales_order_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  sales_order_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  quantity DECIMAL(15,3) NOT NULL,
  unit_price DECIMAL(15,2) NOT NULL DEFAULT 0,
  discount DECIMAL(15,2) NOT NULL DEFAULT 0,
  tax DECIMAL(15,2) NOT NULL DEFAULT 0,
  line_total DECIMAL(15,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_sale_items_sale (sales_order_id),
  KEY idx_sale_items_product (product_id),
  CONSTRAINT fk_sale_item_sale FOREIGN KEY (sales_order_id) REFERENCES sales_orders(id),
  CONSTRAINT fk_sale_item_product FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS opportunities (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  customer_id BIGINT UNSIGNED NULL,
  assigned_to BIGINT UNSIGNED NULL,
  stage ENUM('LEAD','MEETING','PROPOSAL','CLOSED_WON','CLOSED_LOST') NOT NULL DEFAULT 'LEAD',
  value DECIMAL(15,2) NOT NULL DEFAULT 0,
  probability DECIMAL(5,2) NOT NULL DEFAULT 0,
  expected_close_date DATE NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_opportunities_customer (customer_id),
  KEY idx_opportunities_assigned (assigned_to),
  KEY idx_opportunities_stage (stage),
  CONSTRAINT fk_opp_customer FOREIGN KEY (customer_id) REFERENCES customers(id),
  CONSTRAINT fk_opp_user FOREIGN KEY (assigned_to) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS crm_activities (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_id BIGINT UNSIGNED NULL,
  opportunity_id BIGINT UNSIGNED NULL,
  assigned_to BIGINT UNSIGNED NULL,
  activity_type ENUM('CALL','EMAIL','MEETING','NOTE','TASK') NOT NULL,
  subject VARCHAR(255) NOT NULL,
  notes TEXT NULL,
  due_at DATETIME NULL,
  completed_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_activity_customer (customer_id),
  KEY idx_activity_opportunity (opportunity_id),
  KEY idx_activity_due (due_at),
  CONSTRAINT fk_activity_customer FOREIGN KEY (customer_id) REFERENCES customers(id),
  CONSTRAINT fk_activity_opportunity FOREIGN KEY (opportunity_id) REFERENCES opportunities(id),
  CONSTRAINT fk_activity_user FOREIGN KEY (assigned_to) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employees (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  employee_code VARCHAR(80) NOT NULL,
  user_id BIGINT UNSIGNED NULL,
  full_name VARCHAR(255) NOT NULL,
  department VARCHAR(120) NULL,
  job_title VARCHAR(120) NULL,
  base_salary DECIMAL(15,2) NOT NULL DEFAULT 0,
  commission_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
  hire_date DATE NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_employee_code (employee_code),
  UNIQUE KEY uq_employee_user (user_id),
  CONSTRAINT fk_employee_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS attendance_records (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  employee_id BIGINT UNSIGNED NOT NULL,
  work_date DATE NOT NULL,
  clock_in DATETIME NULL,
  clock_out DATETIME NULL,
  status ENUM('PRESENT','LATE','ABSENT','LEAVE') NOT NULL DEFAULT 'PRESENT',
  notes VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_attendance_employee_date (employee_id, work_date),
  KEY idx_attendance_date (work_date),
  CONSTRAINT fk_attendance_employee FOREIGN KEY (employee_id) REFERENCES employees(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payroll_runs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  status ENUM('DRAFT','CALCULATED','APPROVED','PAID') NOT NULL DEFAULT 'DRAFT',
  total_gross DECIMAL(15,2) NOT NULL DEFAULT 0,
  total_commission DECIMAL(15,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_payroll_period (period_start, period_end)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payroll_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  payroll_run_id BIGINT UNSIGNED NOT NULL,
  employee_id BIGINT UNSIGNED NOT NULL,
  base_salary DECIMAL(15,2) NOT NULL DEFAULT 0,
  commission DECIMAL(15,2) NOT NULL DEFAULT 0,
  deductions DECIMAL(15,2) NOT NULL DEFAULT 0,
  net_pay DECIMAL(15,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq_payroll_employee (payroll_run_id, employee_id),
  CONSTRAINT fk_payroll_item_run FOREIGN KEY (payroll_run_id) REFERENCES payroll_runs(id),
  CONSTRAINT fk_payroll_item_employee FOREIGN KEY (employee_id) REFERENCES employees(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS roles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(500) NULL,
  is_system BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id),
  UNIQUE KEY uq_roles_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS permissions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  role_id BIGINT UNSIGNED NOT NULL,
  module_name VARCHAR(100) NOT NULL,
  can_view BOOLEAN NOT NULL DEFAULT FALSE,
  can_create BOOLEAN NOT NULL DEFAULT FALSE,
  can_edit BOOLEAN NOT NULL DEFAULT FALSE,
  can_delete BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id),
  UNIQUE KEY uq_role_module (role_id, module_name),
  CONSTRAINT fk_permission_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT IGNORE INTO roles (name, description, is_system) VALUES
('Administrator', 'Full system access', TRUE),
('Manager', 'Operational and reporting access', TRUE),
('Cashier', 'Sales and customer-facing POS access', TRUE),
('Inventory Clerk', 'Products, stock and warehouse operations', TRUE),
('HR Officer', 'Employee and attendance administration', TRUE),
('Sales Representative', 'Customers, CRM and assigned sales operations', TRUE);
