import { v4 as uuid } from "uuid";

import type { Product } from "../types/Product";
import type { ProductSchema } from "../validation/productSchema";

export function createProduct(
  data: ProductSchema,
): Product {

  return {

    id: uuid(),

    name: data.name,

    sku: data.sku,

    barcode: data.barcode,

    categoryId: data.categoryId,

    brandId: data.brandId,

    unitId: data.unitId,

    costPrice: data.costPrice,

    sellingPrice: data.sellingPrice,

    quantity: data.quantity,

    minimumStock: data.minimumStock,

    description: data.description,

    createdAt: new Date(),

    updatedAt: new Date(),

  };

}