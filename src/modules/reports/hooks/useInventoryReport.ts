import { useProductList }
from "../../inventory/hooks/useProductList";

export function useInventoryReport() {

  const {

    products,

  } = useProductList();

  const total = products.reduce(

    (sum, product) =>

      sum +

      product.quantity *

      product.costPrice,

    0,

  );

  return {

    total,

  };

}