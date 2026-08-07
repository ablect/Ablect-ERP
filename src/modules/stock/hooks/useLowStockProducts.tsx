import { useMemo } from "react";

import { useProductList }
from "../../inventory/hooks/useProductList";

export function useLowStockProducts() {

  const {
    products,
  } = useProductList();

  const lowStock = useMemo(() => {

    return products.filter(

      product =>

        product.quantity <= product.minimumStock

    );

  }, [products]);

  return {

    products: lowStock,

    count: lowStock.length,

  };

}