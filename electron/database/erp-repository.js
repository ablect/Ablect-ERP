/**
 * Transactional persistence layer for the local ERP database.
 *
 * UI code never writes SQL directly. All mutations pass through this module so
 * stock, sales, purchases, customers and audit records stay consistent.
 */

function requirePositiveQuantity(value, field = "quantity") {
  const quantity = Number(value);
  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error(`${field} must be greater than zero.`);
  }
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

export function createErpRepository(pool) {
  return {
    async listProducts(search = "") {
      const term = `%${search.trim()}%`;
      const [rows] = await pool.query(
        `SELECT id, barcode, sku, name, category, unit, cost_price, selling_price,
                quantity, minimum_stock, created_at, updated_at
           FROM products
          WHERE ? = '%%' OR name LIKE ? OR barcode LIKE ? OR sku LIKE ?
          ORDER BY name ASC
          LIMIT 500`,
        [term, term, term, term],
      );
      return rows;
    },

    async listCustomers(search = "") {
      const term = `%${search.trim()}%`;
      const [rows] = await pool.query(
        `SELECT id, customer_code, full_name, business_name, phone, email,
                customer_type, loyalty_points, credit_limit, credit_balance, is_active,
                created_at, updated_at
           FROM customers
          WHERE ? = '%%' OR full_name LIKE ? OR business_name LIKE ? OR phone LIKE ?
          ORDER BY full_name ASC
          LIMIT 500`,
        [term, term, term, term],
      );
      return rows;
    },

    async listSuppliers(search = "") {
      const term = `%${search.trim()}%`;
      const [rows] = await pool.query(
        `SELECT id, supplier_code, name, contact_person, phone, email, address,
                lead_time_days, payment_terms, is_active, created_at, updated_at
           FROM suppliers
          WHERE ? = '%%' OR name LIKE ? OR supplier_code LIKE ? OR phone LIKE ?
          ORDER BY name ASC
          LIMIT 500`,
        [term, term, term, term],
      );
      return rows;
    },

    async listWarehouses() {
      const [rows] = await pool.query(
        `SELECT w.id, w.name, w.code, w.address, w.is_active,
                COALESCE(SUM(ws.quantity), 0) AS total_units,
                COUNT(ws.product_id) AS product_count
           FROM warehouses w
      LEFT JOIN warehouse_stock ws ON ws.warehouse_id = w.id
       GROUP BY w.id
       ORDER BY w.name ASC`,
      );
      return rows;
    },

    async getDashboardMetrics() {
      const [[sales]] = await pool.query(
        `SELECT COALESCE(SUM(total), 0) AS revenue,
                COUNT(*) AS transactions
           FROM sales_orders
          WHERE status = 'COMPLETED'
            AND created_at >= CURRENT_DATE`,
      );
      const [[stock]] = await pool.query(
        `SELECT COALESCE(SUM(quantity * cost_price), 0) AS stock_value,
                SUM(CASE WHEN quantity <= minimum_stock THEN 1 ELSE 0 END) AS low_stock_items
           FROM products`,
      );
      const [[customers]] = await pool.query(
        `SELECT COUNT(*) AS active_customers FROM customers WHERE is_active = TRUE`,
      );
      return { sales, stock, customers };
    },

    async createSale({ saleNumber, customerId, warehouseId, userId, paymentMethod, paidAmount, items }) {
      if (!saleNumber || !Array.isArray(items) || items.length === 0) {
        throw new Error("A sale number and at least one item are required.");
      }

      return withTransaction(pool, async (connection) => {
        let subtotal = 0;
        const normalizedItems = [];

        for (const item of items) {
          const quantity = requirePositiveQuantity(item.quantity, "item quantity");
          const [productRows] = await connection.query(
            `SELECT id, name, selling_price, quantity
               FROM products WHERE id = ? FOR UPDATE`,
            [item.productId],
          );
          const product = productRows[0];
          if (!product) throw new Error(`Product ${item.productId} was not found.`);
          if (Number(product.quantity) < quantity) {
            throw new Error(`Insufficient stock for ${product.name}. Available: ${product.quantity}.`);
          }

          const unitPrice = Number(item.unitPrice ?? product.selling_price);
          const discount = Number(item.discount ?? 0);
          const tax = Number(item.tax ?? 0);
          const lineTotal = Math.max(0, quantity * unitPrice - discount + tax);
          subtotal += lineTotal;
          normalizedItems.push({ ...item, quantity, unitPrice, discount, tax, lineTotal });
        }

        const total = subtotal;
        const paymentStatus = Number(paidAmount ?? 0) >= total ? "PAID" : Number(paidAmount ?? 0) > 0 ? "PARTIAL" : "UNPAID";

        const [saleResult] = await connection.query(
          `INSERT INTO sales_orders
             (sale_number, customer_id, warehouse_id, status, payment_status, payment_method,
              subtotal, total, paid_amount, created_by)
           VALUES (?, ?, ?, 'COMPLETED', ?, ?, ?, ?, ?, ?)`,
          [saleNumber, customerId ?? null, warehouseId ?? null, paymentStatus, paymentMethod ?? null,
           subtotal, total, Number(paidAmount ?? 0), userId ?? null],
        );

        for (const item of normalizedItems) {
          await connection.query(
            `INSERT INTO sales_order_items
              (sales_order_id, product_id, quantity, unit_price, discount, tax, line_total)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [saleResult.insertId, item.productId, item.quantity, item.unitPrice,
             item.discount, item.tax, item.lineTotal],
          );

          await connection.query(
            `UPDATE products SET quantity = quantity - ? WHERE id = ?`,
            [item.quantity, item.productId],
          );

          if (warehouseId) {
            await connection.query(
              `INSERT INTO warehouse_stock (warehouse_id, product_id, quantity)
               VALUES (?, ?, ?)
               ON DUPLICATE KEY UPDATE quantity = quantity - VALUES(quantity)`,
              [warehouseId, item.productId, item.quantity],
            );
          }

          await connection.query(
            `INSERT INTO stock_movements
              (product_id, movement_type, quantity, source_warehouse_id, reference_type, reference_id, performed_by)
             VALUES (?, 'OUT', ?, ?, 'SALE', ?, ?)`,
            [item.productId, item.quantity, warehouseId ?? null, saleNumber, userId ?? null],
          );
        }

        if (customerId) {
          await connection.query(
            `UPDATE customers SET loyalty_points = loyalty_points + FLOOR(? / 100) WHERE id = ?`,
            [total, customerId],
          );
        }

        await connection.query(
          `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details)
           VALUES (?, 'CREATE', 'SALE', ?, JSON_OBJECT('total', ?, 'items', ?))`,
          [userId ?? null, String(saleResult.insertId), total, normalizedItems.length],
        );

        return { id: saleResult.insertId, saleNumber, total, paymentStatus };
      });
    },

    async receivePurchaseOrder({ purchaseOrderId, userId }) {
      return withTransaction(pool, async (connection) => {
        const [orders] = await connection.query(
          `SELECT id, po_number, warehouse_id, status
             FROM purchase_orders WHERE id = ? FOR UPDATE`,
          [purchaseOrderId],
        );
        const order = orders[0];
        if (!order) throw new Error("Purchase order was not found.");
        if (["RECEIVED", "CANCELLED"].includes(order.status)) {
          throw new Error(`Purchase order is already ${order.status.toLowerCase()}.`);
        }

        const [items] = await connection.query(
          `SELECT id, product_id, quantity, received_quantity
             FROM purchase_order_items
            WHERE purchase_order_id = ? FOR UPDATE`,
          [purchaseOrderId],
        );
        if (!items.length) throw new Error("Purchase order has no items.");

        for (const item of items) {
          const outstanding = Number(item.quantity) - Number(item.received_quantity);
          if (outstanding <= 0) continue;

          await connection.query(
            `UPDATE purchase_order_items SET received_quantity = quantity WHERE id = ?`,
            [item.id],
          );
          await connection.query(
            `UPDATE products SET quantity = quantity + ? WHERE id = ?`,
            [outstanding, item.product_id],
          );
          await connection.query(
            `INSERT INTO warehouse_stock (warehouse_id, product_id, quantity)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
            [order.warehouse_id, item.product_id, outstanding],
          );
          await connection.query(
            `INSERT INTO stock_movements
              (product_id, movement_type, quantity, destination_warehouse_id, reference_type, reference_id, performed_by)
             VALUES (?, 'IN', ?, ?, 'PURCHASE_ORDER', ?, ?)`,
            [item.product_id, outstanding, order.warehouse_id, order.po_number, userId ?? null],
          );
        }

        await connection.query(
          `UPDATE purchase_orders SET status = 'RECEIVED' WHERE id = ?`,
          [purchaseOrderId],
        );
        await connection.query(
          `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details)
           VALUES (?, 'RECEIVE', 'PURCHASE_ORDER', ?, JSON_OBJECT('poNumber', ?))`,
          [userId ?? null, String(purchaseOrderId), order.po_number],
        );

        return { purchaseOrderId, status: "RECEIVED" };
      });
    },

    async transferStock({ productId, sourceWarehouseId, destinationWarehouseId, quantity, userId, referenceId }) {
      const amount = requirePositiveQuantity(quantity);
      if (sourceWarehouseId === destinationWarehouseId) {
        throw new Error("Source and destination warehouses must be different.");
      }

      return withTransaction(pool, async (connection) => {
        const [rows] = await connection.query(
          `SELECT quantity FROM warehouse_stock
            WHERE warehouse_id = ? AND product_id = ? FOR UPDATE`,
          [sourceWarehouseId, productId],
        );
        const source = rows[0];
        if (!source || Number(source.quantity) < amount) {
          throw new Error("Insufficient stock in the source warehouse.");
        }

        await connection.query(
          `UPDATE warehouse_stock SET quantity = quantity - ?
            WHERE warehouse_id = ? AND product_id = ?`,
          [amount, sourceWarehouseId, productId],
        );
        await connection.query(
          `INSERT INTO warehouse_stock (warehouse_id, product_id, quantity)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
          [destinationWarehouseId, productId, amount],
        );
        await connection.query(
          `INSERT INTO stock_movements
            (product_id, movement_type, quantity, source_warehouse_id, destination_warehouse_id, reference_type, reference_id, performed_by)
           VALUES (?, 'TRANSFER', ?, ?, ?, 'TRANSFER', ?, ?)`,
          [productId, amount, sourceWarehouseId, destinationWarehouseId, referenceId ?? null, userId ?? null],
        );

        return { productId, quantity: amount, sourceWarehouseId, destinationWarehouseId };
      });
    },
  };
}
