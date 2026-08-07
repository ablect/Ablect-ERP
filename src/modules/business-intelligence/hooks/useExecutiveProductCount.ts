import { useEffect, useState } from "react";

import { useProducts } from "../../inventory/hooks/useProducts";

export function useExecutiveProductCount() {

  const { products } = useProducts();

  const [productCount, setProductCount] = useState(0);

  useEffect(() => {

    async function load() {

      const list = await products;

      setProductCount(list.length);

    }

    load();

  }, [products]);

  return {

    productCount,

  };

}