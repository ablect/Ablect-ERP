import type { Product }
from "../../inventory/types/Product";

export function isOutOfStock(
  product: Product,
) {

  return product.quantity === 0;

}