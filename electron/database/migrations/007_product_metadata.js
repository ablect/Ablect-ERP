export async function up(connection) {
  const columns = [
    ["brand", "VARCHAR(160) NULL"],
    ["description", "TEXT NULL"],
  ];
  for (const [name, definition] of columns) {
    const [[found]] = await connection.query(`SELECT COUNT(*) AS count FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='products' AND COLUMN_NAME=?`, [name]);
    if (Number(found.count) === 0) await connection.query(`ALTER TABLE products ADD COLUMN ${name} ${definition}`);
  }
}
