import type { Product } from "../types/Product";

export function getTotalInventoryValue(

  products: Product[],

): number {

  return products.reduce(

    (total, product) =>

      total +

      product.sellingPrice *

      product.quantity,

    0,

  );

}