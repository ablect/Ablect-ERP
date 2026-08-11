import crypto from "node:crypto";

function positiveQuantity(value) {
  const quantity = Number(value);
  if (!Number.isFinite(quantity) || quantity <= 0) throw new Error("Sale quantity must be greater than zero.");
  return quantity;
}

async function withTransaction(pool, work) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await work(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export function createSalesService(pool) {
  return {
    async createSale({ customerId, warehouseId, userId, paymentMethod, paidAmount, items }) {
      if (!Array.isArray(items) || items.length === 0) throw new Error("A sale must contain at least one item.");

      return withTransaction(pool, async (connection) => {
        const normalized = [];
        let subtotal = 0;

        for (const item of items) {
          const quantity = positiveQuantity(item.quantity);
          const [rows] = await connection.query(`SELECT id, name, selling_price, quantity FROM products WHERE id = ? FOR UPDATE`, [item.productId]);
          const product = rows[0];
          if (!product) throw new Error(`Product ${item.productId} was not found.`);
          if (Number(product.quantity) < quantity) throw new Error(`Insufficient stock for ${product.name}. Available: ${product.quantity}.`);
          const unitPrice = Number(item.unitPrice ?? product.selling_price);
          if (!Number.isFinite(unitPrice) || unitPrice < 0) throw new Error(`Invalid price for ${product.name}.`);
          const discount = Math.max(0, Number(item.discount ?? 0));
          const tax = Math.max(0, Number(item.tax ?? 0));
          const lineTotal = Math.max(0, quantity * unitPrice - discount + tax);
          subtotal += lineTotal;
          normalized.push({ productId: item.productId, quantity, unitPrice, discount, tax, lineTotal });
        }

        const total = subtotal;
        const paid = Math.max(0, Number(paidAmount ?? 0));
        const paymentStatus = paid >= total ? "PAID" : paid > 0 ? "PARTIAL" : "UNPAID";
        const temporaryNumber = `TMP-${crypto.randomUUID()}`;
        const [result] = await connection.query(
          `INSERT INTO sales_orders (sale_number, customer_id, warehouse_id, status, payment_status, payment_method, subtotal, total, paid_amount, created_by)
           VALUES (?, ?, ?, 'COMPLETED', ?, ?, ?, ?, ?, ?)`,
          [temporaryNumber, customerId ?? null, warehouseId ?? null, paymentStatus, paymentMethod ?? null, subtotal, total, paid, userId ?? null],
        );

        const invoiceNumber = `INV-${String(result.insertId).padStart(5, "0")}`;
        await connection.query(`UPDATE sales_orders SET sale_number = ? WHERE id = ?`, [invoiceNumber, result.insertId]);

        for (const item of normalized) {
          await connection.query(`INSERT INTO sales_order_items (sales_order_id, product_id, quantity, unit_price, discount, tax, line_total) VALUES (?, ?, ?, ?, ?, ?, ?)`, [result.insertId, item.productId, item.quantity, item.unitPrice, item.discount, item.tax, item.lineTotal]);
          await connection.query(`UPDATE products SET quantity = quantity - ? WHERE id = ?`, [item.quantity, item.productId]);
          if (warehouseId) {
            await connection.query(`INSERT INTO warehouse_stock (warehouse_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity - VALUES(quantity)`, [warehouseId, item.productId, item.quantity]);
          }
          await connection.query(`INSERT INTO stock_movements (product_id, movement_type, quantity, source_warehouse_id, reference_type, reference_id, performed_by) VALUES (?, 'OUT', ?, ?, 'SALE', ?, ?)`, [item.productId, item.quantity, warehouseId ?? null, invoiceNumber, userId ?? null]);
        }

        if (customerId) await connection.query(`UPDATE customers SET loyalty_points = loyalty_points + FLOOR(? / 100) WHERE id = ?`, [total, customerId]);
        await connection.query(`INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details) VALUES (?, 'CREATE', 'SALE', ?, JSON_OBJECT('invoiceNumber', ?, 'total', ?, 'items', ?))`, [userId ?? null, String(result.insertId), invoiceNumber, total, normalized.length]);
        return { id: String(result.insertId), saleNumber: invoiceNumber, total, paidAmount: paid, paymentStatus };
      });
    },
  };
}
