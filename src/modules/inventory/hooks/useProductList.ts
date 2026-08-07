import { useProductStore } from "../store/ProductStore";

export function useProductList() {

  const {

    products,

  } = useProductStore();

  return {

    products,

  };

}