export function createProcurementRepository(pool) {
  return {
    async createSupplier(payload) {
      const code=payload.supplierCode||`SUP-${Date.now().toString().slice(-8)}`;
      await pool.query(`INSERT INTO suppliers (supplier_code,name,contact_person,phone,email,address,lead_time_days,payment_terms,is_active) VALUES (?,?,?,?,?,?,?,?,TRUE)`,[code,payload.name,payload.contactPerson||null,payload.phone||null,payload.email||null,payload.address||null,Number(payload.leadTimeDays||0),payload.paymentTerms||null]);
      const [rows]=await pool.query(`SELECT * FROM suppliers ORDER BY name ASC LIMIT 1000`); return rows;
    },
    async createWarehouse(payload) {
      const code=payload.code||`WH-${Date.now().toString().slice(-6)}`;
      await pool.query(`INSERT INTO warehouses (name,code,address,is_active) VALUES (?,?,?,TRUE)`,[payload.name,code,payload.location||payload.address||null]);
      const [rows]=await pool.query(`SELECT w.id,w.name,w.code,w.address,w.is_active,COALESCE(SUM(ws.quantity),0) total_units,COUNT(ws.product_id) product_count FROM warehouses w LEFT JOIN warehouse_stock ws ON ws.warehouse_id=w.id GROUP BY w.id ORDER BY w.name ASC`); return rows;
    },
    async createPurchaseOrder(payload) {
      if(!payload.supplierId||!payload.warehouseId||!Array.isArray(payload.lines)||!payload.lines.length) throw new Error("Supplier, destination warehouse and at least one product line are required.");
      const connection=await pool.getConnection();
      try {
        await connection.beginTransaction();
        const number=payload.number||`PO-${Date.now().toString().slice(-8)}`;
        let subtotal=0;
        const lines=[];
        for(const line of payload.lines){
          const quantity=Number(line.quantity); const unitCost=Number(line.unitCost||0);
          if(!Number.isFinite(quantity)||quantity<=0) throw new Error("Purchase quantity must be greater than zero.");
          const [products]=await connection.query(`SELECT id FROM products WHERE id=?`,[line.productId]); if(!products[0]) throw new Error(`Product ${line.productId} was not found.`);
          const lineTotal=quantity*unitCost; subtotal+=lineTotal; lines.push({productId:line.productId,quantity,unitCost,lineTotal});
        }
        const tax=Number(payload.tax||0); const total=subtotal+tax;
        const [result]=await connection.query(`INSERT INTO purchase_orders (po_number,supplier_id,warehouse_id,status,order_date,expected_date,subtotal,tax,total,notes,created_by) VALUES (?,?,?,'DRAFT',?,?,?,?,?,?,?)`,[number,payload.supplierId,payload.warehouseId,payload.orderDate?new Date(payload.orderDate):new Date(),payload.expectedDate?new Date(payload.expectedDate):null,subtotal,tax,total,payload.notes||null,payload.userId||null]);
        for(const line of lines) await connection.query(`INSERT INTO purchase_order_items (purchase_order_id,product_id,quantity,unit_cost,line_total) VALUES (?,?,?,?,?)`,[result.insertId,line.productId,line.quantity,line.unitCost,line.lineTotal]);
        await connection.query(`INSERT INTO audit_logs (user_id,action,entity_type,entity_id,details) VALUES (?,'CREATE','PURCHASE_ORDER',?,JSON_OBJECT('poNumber',?,'total',?))`,[payload.userId||null,String(result.insertId),number,total]);
        await connection.commit();
        return {id:String(result.insertId),number,total,status:"Draft"};
      } catch(error) { await connection.rollback(); throw error; } finally { connection.release(); }
    },
  };
}
