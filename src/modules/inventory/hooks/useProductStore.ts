import { useProductStore } from "../store/ProductStore";

export function useProducts() {

  const {

    products,

    addProduct,

    updateProduct,

    deleteProduct,

    selectedProduct,

    selectProduct,

  } = useProductStore();

  return {

    products,

    addProduct,

    updateProduct,

    deleteProduct,

    selectedProduct,

    selectProduct,

  };

}