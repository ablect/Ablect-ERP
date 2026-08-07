import { useProductStore } from "../store/ProductStore";

export function useInventorySummary() {

  const {

    products,

  } = useProductStore();

  const inStock =

    products.filter(

      p => p.quantity > 10

    ).length;

  const lowStock =

    products.filter(

      p =>

        p.quantity > 0 &&

        p.quantity <= 10

    ).length;

  const outOfStock =

    products.filter(

      p => p.quantity <= 0

    ).length;

  return {

    inStock,

    lowStock,

    outOfStock,

  };

}