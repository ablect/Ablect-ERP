function positive(value, field) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) throw new Error(`${field} must be zero or greater.`);
  return number;
}

export function createPosSalesRepository(pool) {
  return {
    async createSale({ saleNumber, customerId, warehouseId, userId, paymentMethod, paidAmount, items, payments = [] }) {
      if (!saleNumber || !Array.isArray(items) || !items.length) throw new Error("A sale number and at least one item are required.");
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
        let subtotal = 0;
        const normalized = [];
        for (const item of items) {
          const quantity = positive(item.quantity, "Item quantity");
          if (quantity <= 0) throw new Error("Item quantity must be greater than zero.");
          const [rows] = await connection.query(`SELECT id,name,selling_price,quantity FROM products WHERE id=? FOR UPDATE`, [item.productId]);
          const product = rows[0];
          if (!product) throw new Error(`Product ${item.productId} was not found.`);
          if (Number(product.quantity) < quantity) throw new Error(`Insufficient stock for ${product.name}. Available: ${product.quantity}.`);
          const unitPrice = Number(item.unitPrice ?? product.selling_price);
          const discount = positive(item.discount ?? 0, "Discount");
          const tax = positive(item.tax ?? 0, "Tax");
          const lineTotal = Math.max(0, quantity * unitPrice - discount + tax);
          subtotal += lineTotal;
          normalized.push({ ...item, quantity, unitPrice, discount, tax, lineTotal });
        }
        const total = subtotal;
        const paid = positive(paidAmount ?? 0, "Paid amount");
        const paymentStatus = paid >= total ? "PAID" : paid > 0 ? "PARTIAL" : "UNPAID";
        const [result] = await connection.query(
          `INSERT INTO sales_orders (sale_number,customer_id,warehouse_id,status,payment_status,payment_method,subtotal,total,paid_amount,created_by) VALUES (?,?,?,'COMPLETED',?,?,?,?,?,?)`,
          [saleNumber, customerId || null, warehouseId || null, paymentStatus, paymentMethod || null, subtotal, total, paid, userId || null],
        );
        for (const item of normalized) {
          await connection.query(`INSERT INTO sales_order_items (sales_order_id,product_id,quantity,unit_price,discount,tax,line_total) VALUES (?,?,?,?,?,?,?)`, [result.insertId, item.productId, item.quantity, item.unitPrice, item.discount, item.tax, item.lineTotal]);
          await connection.query(`UPDATE products SET quantity=quantity-? WHERE id=?`, [item.quantity, item.productId]);
          if (warehouseId) await connection.query(`INSERT INTO warehouse_stock (warehouse_id,product_id,quantity) VALUES (?,?,?) ON DUPLICATE KEY UPDATE quantity=quantity-VALUES(quantity)`, [warehouseId, item.productId, item.quantity]);
          await connection.query(`INSERT INTO stock_movements (product_id,movement_type,quantity,source_warehouse_id,reference_type,reference_id,performed_by) VALUES (?,'OUT',? ,?,'SALE',?,?)`, [item.productId, item.quantity, warehouseId || null, saleNumber, userId || null]);
        }
        const paymentLines = Array.isArray(payments) && payments.length ? payments : [{ method: paymentMethod || "Cash", amount: paid, reference: "" }];
        for (const payment of paymentLines) {
          const amount = positive(payment.amount ?? 0, "Payment amount");
          if (amount <= 0) continue;
          await connection.query(`INSERT INTO sales_payments (sales_order_id,method,amount,reference,created_by) VALUES (?,?,?,?,?)`, [result.insertId, payment.method || "Cash", amount, payment.reference || null, userId || null]);
        }
        if (customerId) await connection.query(`UPDATE customers SET loyalty_points=loyalty_points+FLOOR(?/100) WHERE id=?`, [total, customerId]);
        await connection.query(`INSERT INTO audit_logs (user_id,action,entity_type,entity_id,details) VALUES (?,'CREATE','SALE',?,JSON_OBJECT('total',?,'items',?,'payments',?))`, [userId || null, String(result.insertId), total, normalized.length, paymentLines.length]);
        await connection.commit();
        return { id: String(result.insertId), saleNumber, total, paymentStatus };
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    },
  };
}
