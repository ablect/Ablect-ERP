import { useMemo } from "react";

import { useFilteredProducts } from "./useFilteredProducts";

import { useProductSortStore } from "../store/ProductSortStore";

import { productSort } from "../utils/productSort";

export function useSortedProducts() {

  const { products } = useFilteredProducts();

  const { sortBy } = useProductSortStore();

  const sortedProducts = useMemo(() => {

    return productSort(products, sortBy);

  }, [

    products,

    sortBy,

  ]);

  return {

    products: sortedProducts,

  };

}