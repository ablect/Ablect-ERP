import type { Product }
from "../../inventory/types/Product";

export function isLowStock(
  product: Product,
) {

  return (

    product.quantity <= product.minimumStock

  );

}