export function createProcurementRepository(pool) {
  return {
    async createSupplier(payload) {
      const code = payload.supplierCode || `SUP-${Date.now().toString().slice(-8)}`;
      await pool.query(
        `INSERT INTO suppliers (supplier_code,name,contact_person,phone,email,address,lead_time_days,payment_terms,is_active)
         VALUES (?,?,?,?,?,?,?,?,TRUE)`,
        [code,payload.name,payload.contactPerson||null,payload.phone||null,payload.email||null,payload.address||null,Number(payload.leadTimeDays||0),payload.paymentTerms||null],
      );
      const [rows] = await pool.query(`SELECT * FROM suppliers ORDER BY name ASC LIMIT 1000`);
      return rows;
    },
  };
}
