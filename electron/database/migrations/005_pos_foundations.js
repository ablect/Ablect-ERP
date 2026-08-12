export async function up(connection) {
  const [[imageColumn]] = await connection.query(`
    SELECT COUNT(*) AS count
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND COLUMN_NAME = 'image_url'
  `);
  if (Number(imageColumn.count) === 0) {
    await connection.query(`ALTER TABLE products ADD COLUMN image_url LONGTEXT NULL AFTER minimum_stock`);
  }

  await connection.query(`
    CREATE TABLE IF NOT EXISTS unit_types (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      code VARCHAR(40) NOT NULL,
      name VARCHAR(80) NOT NULL,
      allows_decimal BOOLEAN NOT NULL DEFAULT FALSE,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      PRIMARY KEY (id),
      UNIQUE KEY uq_unit_types_code (code)
    ) ENGINE=InnoDB
  `);

  await connection.query(`
    INSERT IGNORE INTO unit_types (code, name, allows_decimal) VALUES
      ('PCS', 'Pieces', FALSE),
      ('PACKET', 'Packets', FALSE),
      ('DOZEN', 'Dozens', FALSE),
      ('CARTON', 'Cartons', FALSE),
      ('BOX', 'Boxes', FALSE),
      ('BAG', 'Bags', FALSE),
      ('BOTTLE', 'Bottles', FALSE),
      ('CAN', 'Cans', FALSE),
      ('KG', 'Kilograms', TRUE),
      ('G', 'Grams', TRUE),
      ('L', 'Litres', TRUE),
      ('ML', 'Millilitres', TRUE),
      ('M', 'Metres', TRUE)
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS app_settings (
      setting_key VARCHAR(120) NOT NULL,
      setting_value JSON NOT NULL,
      updated_by BIGINT UNSIGNED NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (setting_key),
      CONSTRAINT fk_app_settings_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB
  `);

  await connection.query(`
    INSERT IGNORE INTO app_settings (setting_key, setting_value) VALUES
      ('general', JSON_OBJECT('businessName','Ablect Technologies','receiptFooter','Thank you for doing business with Ablect Technologies.')),
      ('localization', JSON_OBJECT('currency','NGN','timezone','Africa/Lagos','dateFormat','DD/MM/YYYY')),
      ('pos', JSON_OBJECT('taxRate',7.5,'requireCustomerForCredit',TRUE,'warnNegativeStock',TRUE,'autoPrint',FALSE,'defaultUnit','PCS')),
      ('hardware', JSON_OBJECT('defaultPrinter','','printerMode','system','receiptWidth','80mm')),
      ('appearance', JSON_OBJECT('theme','system','accent','indigo','sounds',TRUE,'animations',TRUE)),
      ('security', JSON_OBJECT('managerOverrideRequired',TRUE,'refundsRequireAdmin',TRUE))
  `);
}
