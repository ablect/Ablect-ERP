export function createSettingsRepository(pool) {
  return {
    async getAll() {
      const [rows] = await pool.query(`SELECT setting_key, setting_value, updated_at FROM app_settings ORDER BY setting_key`);
      return rows.map((row) => ({ key: row.setting_key, value: row.setting_value, updatedAt: row.updated_at }));
    },
    async get(key) {
      const [[row]] = await pool.query(`SELECT setting_key, setting_value, updated_at FROM app_settings WHERE setting_key=? LIMIT 1`, [key]);
      return row ? { key: row.setting_key, value: row.setting_value, updatedAt: row.updated_at } : null;
    },
    async save(key, value, userId = null) {
      if (!key || typeof value !== 'object' || value === null) throw new Error('A settings key and object value are required.');
      await pool.query(
        `INSERT INTO app_settings (setting_key, setting_value, updated_by) VALUES (?, CAST(? AS JSON), ?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value), updated_by=VALUES(updated_by)`,
        [key, JSON.stringify(value), userId || null],
      );
      return this.get(key);
    },
  };
}
