export async function up(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS sales_payments (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      sales_order_id BIGINT UNSIGNED NOT NULL,
      method VARCHAR(50) NOT NULL,
      amount DECIMAL(15,2) NOT NULL DEFAULT 0,
      reference VARCHAR(160) NULL,
      created_by BIGINT UNSIGNED NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY idx_sales_payments_sale (sales_order_id),
      CONSTRAINT fk_sales_payments_sale FOREIGN KEY (sales_order_id) REFERENCES sales_orders(id) ON DELETE CASCADE,
      CONSTRAINT fk_sales_payments_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB
  `);
}
