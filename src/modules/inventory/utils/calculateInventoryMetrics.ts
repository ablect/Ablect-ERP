import type { Product } from "../types/Product";

export function calculateInventoryMetrics(
  products: Product[],
) {

  const totalProducts = products.length;

  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  const totalValue = products.reduce(
    (sum, product) =>
      sum + (product.quantity * product.sellingPrice),
    0,
  );

  return {

    totalProducts,

    totalQuantity,

    totalValue,

  };

}