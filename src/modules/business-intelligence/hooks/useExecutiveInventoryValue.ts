import { useEffect, useState } from "react";

import { useProducts } from "../../inventory/hooks/useProducts";

export function useExecutiveInventoryValue() {

  const { products } = useProducts();

  const [inventoryValue, setInventoryValue] = useState(0);

  useEffect(() => {

    async function calculate() {

      const list = await products;

      const total = list.reduce(

        (sum, product) =>

          sum + product.quantity * product.costPrice,

        0,

      );

      setInventoryValue(total);

    }

    calculate();

  }, [products]);

  return {

    inventoryValue,

  };

}