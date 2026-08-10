function stockStatus(quantity, minimumStock, isTracked = true) {
  if (!isTracked) return "In Stock";
  if (Number(quantity) <= 0) return "Out of Stock";
  if (Number(quantity) <= Number(minimumStock)) return "Low Stock";
  return "In Stock";
}

function mapProduct(row, variants = []) {
  return {
    id: String(row.id),
    sku: row.sku ?? "",
    barcode: row.barcode ?? "",
    itemName: row.name ?? "",
    category: row.category ?? "General",
    warehouse: row.warehouse ?? "",
    unit: row.unit ?? "PCS",
    quantity: Number(row.quantity ?? 0),
    reorderLevel: Number(row.minimum_stock ?? 0),
    unitCost: Number(row.cost_price ?? 0),
    sellingPrice: Number(row.selling_price ?? 0),
    status: stockStatus(row.quantity, row.minimum_stock, Boolean(row.is_tracked)),
    brand: row.brand ?? "",
    description: row.description ?? "",
    imageUrl: row.image_url ?? "",
    isTracked: Boolean(row.is_tracked),
    baseUnitCode: row.base_unit_code ?? row.unit ?? "PCS",
    unitVariants: variants.filter((variant) => String(variant.product_id) === String(row.id)).map((variant) => ({
      id: String(variant.id),
      code: String(variant.unit_code),
      name: String(variant.unit_name),
      conversionToBase: Number(variant.conversion_to_base),
      sellingPrice: Number(variant.selling_price),
      isDefault: Boolean(variant.is_default),
    })),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createPosRepository(pool) {
  return {
    async listProducts(search = "") {
      const term = `%${String(search).trim()}%`;
      const [rows] = await pool.query(
        `SELECT id,barcode,sku,name,category,unit,cost_price,selling_price,quantity,minimum_stock,image_url,brand,description,is_tracked,base_unit_code,created_at,updated_at
         FROM products
         WHERE ?='%%' OR name LIKE ? OR barcode LIKE ? OR sku LIKE ? OR category LIKE ? OR brand LIKE ?
         ORDER BY name ASC LIMIT 2000`,
        [term, term, term, term, term, term],
      );
      const [variants] = await pool.query(
        `SELECT id,product_id,unit_code,unit_name,conversion_to_base,selling_price,is_default FROM product_unit_variants WHERE product_id IN (SELECT id FROM products WHERE ?='%%' OR name LIKE ? OR barcode LIKE ? OR sku LIKE ? OR category LIKE ? OR brand LIKE ?) ORDER BY product_id,id`,
        [term, term, term, term, term, term],
      );
      return rows.map((row) => mapProduct(row, variants));
    },

    async createProduct(payload) {
      const isTracked = payload.isTracked !== false;
      const baseUnitCode = String(payload.baseUnitCode || payload.unit || "PCS").toUpperCase();
      const [result] = await pool.query(
        `INSERT INTO products (barcode,sku,name,category,unit,cost_price,selling_price,quantity,minimum_stock,image_url,brand,description,is_tracked,base_unit_code) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [payload.barcode || null, payload.sku || null, payload.itemName, payload.category || "General", baseUnitCode, Number(payload.unitCost || 0), Number(payload.sellingPrice || 0), isTracked ? Number(payload.quantity || 0) : 0, Number(payload.reorderLevel || 0), payload.imageUrl || null, payload.brand || null, payload.description || null, isTracked ? 1 : 0, baseUnitCode],
      );
      await this.replaceUnitVariants(result.insertId, payload.unitVariants, baseUnitCode, Number(payload.sellingPrice || 0));
      return this.listProducts();
    },

    async updateProduct(payload) {
      const isTracked = payload.isTracked !== false;
      const baseUnitCode = String(payload.baseUnitCode || payload.unit || "PCS").toUpperCase();
      await pool.query(
        `UPDATE products SET barcode=?,sku=?,name=?,category=?,unit=?,cost_price=?,selling_price=?,quantity=?,minimum_stock=?,image_url=?,brand=?,description=?,is_tracked=?,base_unit_code=? WHERE id=?`,
        [payload.barcode || null, payload.sku || null, payload.itemName, payload.category || "General", baseUnitCode, Number(payload.unitCost || 0), Number(payload.sellingPrice || 0), isTracked ? Number(payload.quantity || 0) : 0, Number(payload.reorderLevel || 0), payload.imageUrl || null, payload.brand || null, payload.description || null, isTracked ? 1 : 0, baseUnitCode, payload.id],
      );
      await this.replaceUnitVariants(payload.id, payload.unitVariants, baseUnitCode, Number(payload.sellingPrice || 0));
      return this.listProducts();
    },

    async replaceUnitVariants(productId, variants, baseUnitCode, basePrice) {
      const incoming = Array.isArray(variants) && variants.length ? variants : [{ code: baseUnitCode, name: baseUnitCode, conversionToBase: 1, sellingPrice: basePrice, isDefault: true }];
      await pool.query(`DELETE FROM product_unit_variants WHERE product_id=?`, [productId]);
      for (const variant of incoming) {
        const factor = Math.max(0.000001, Number(variant.conversionToBase || 1));
        await pool.query(
          `INSERT INTO product_unit_variants (product_id,unit_code,unit_name,conversion_to_base,selling_price,is_default) VALUES (?,?,?,?,?,?)`,
          [productId, String(variant.code || baseUnitCode).toUpperCase(), String(variant.name || variant.code || baseUnitCode), factor, Number(variant.sellingPrice ?? basePrice), variant.isDefault ? 1 : 0],
        );
      }
    },

    async deleteProduct(id) {
      const [[sales]] = await pool.query(`SELECT COUNT(*) count FROM sales_order_items WHERE product_id=?`, [id]);
      const [[purchases]] = await pool.query(`SELECT COUNT(*) count FROM purchase_order_items WHERE product_id=?`, [id]);
      if (Number(sales.count) || Number(purchases.count)) throw new Error("Product is already referenced by a transaction and cannot be deleted.");
      await pool.query(`DELETE FROM warehouse_stock WHERE product_id=?`, [id]);
      await pool.query(`DELETE FROM products WHERE id=?`, [id]);
      return this.listProducts();
    },

    async listUnitTypes() {
      const [rows] = await pool.query(`SELECT id,code,name,allows_decimal,is_active FROM unit_types WHERE is_active=TRUE ORDER BY name ASC`);
      return rows.map((row) => ({ id: String(row.id), code: row.code, name: row.name, allowsDecimal: Boolean(row.allows_decimal), isActive: Boolean(row.is_active) }));
    },
  };
}
