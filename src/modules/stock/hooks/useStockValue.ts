import { useMemo } from "react";

import { useProductList }
from "../../inventory/hooks/useProductList";

export function useStockValue() {

  const {

    products,

  } = useProductList();

  const total = useMemo(() => {

    return products.reduce(

      (sum, product) =>

        sum +

        product.quantity *

        product.costPrice,

      0

    );

  }, [products]);

  return {

    total,

  };

}