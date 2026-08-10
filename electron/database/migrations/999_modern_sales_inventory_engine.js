function columnExists(rows, name) {
  return rows.some((row) => String(row.COLUMN_NAME).toLowerCase() === name.toLowerCase());
}

async function addColumnIfMissing(connection, table, column, definition) {
  const [rows] = await connection.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
    [table],
  );
  if (!columnExists(rows, column)) {
    await connection.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`);
  }
}

export async function up(connection) {
  await addColumnIfMissing(connection, "products", "is_tracked", "TINYINT(1) NOT NULL DEFAULT 1");
  await addColumnIfMissing(connection, "products", "base_unit_code", "VARCHAR(30) NOT NULL DEFAULT 'PCS'");

  await connection.query(`
    CREATE TABLE IF NOT EXISTS product_unit_variants (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      product_id BIGINT UNSIGNED NOT NULL,
      unit_code VARCHAR(30) NOT NULL,
      unit_name VARCHAR(80) NOT NULL,
      conversion_to_base DECIMAL(18,6) NOT NULL DEFAULT 1,
      selling_price DECIMAL(18,2) NOT NULL DEFAULT 0,
      is_default TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_product_unit (product_id, unit_code),
      KEY idx_product_unit_product (product_id),
      CONSTRAINT fk_product_unit_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);

  const [products] = await connection.query(`SELECT id, unit, selling_price, base_unit_code FROM products`);
  for (const product of products) {
    const baseUnit = String(product.base_unit_code || product.unit || "PCS").toUpperCase();
    await connection.query(
      `UPDATE products SET base_unit_code=? WHERE id=?`,
      [baseUnit, product.id],
    );
    await connection.query(
      `INSERT IGNORE INTO product_unit_variants (product_id,unit_code,unit_name,conversion_to_base,selling_price,is_default) VALUES (?,?,?,?,?,1)`,
      [product.id, baseUnit, baseUnit, 1, Number(product.selling_price || 0)],
    );
  }
}
