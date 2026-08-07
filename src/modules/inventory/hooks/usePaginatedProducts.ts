import { useMemo } from "react";

import { useSortedProducts } from "./useSortedProducts";

import { useProductPaginationStore }
from "../store/ProductPaginationStore";

import { paginateProducts }
from "../utils/paginateProducts";

export function usePaginatedProducts() {

  const {

    products,

  } = useSortedProducts();

  const {

    page,

    pageSize,

  } = useProductPaginationStore();

  const paginatedProducts =
    useMemo(() => {

      return paginateProducts(

        products,

        page,

        pageSize,

      );

    }, [

      products,

      page,

      pageSize,

    ]);

  const totalPages =

    Math.max(

      1,

      Math.ceil(

        products.length /

        pageSize,

      ),

    );

  return {

    products: paginatedProducts,

    page,

    totalPages,

  };

}