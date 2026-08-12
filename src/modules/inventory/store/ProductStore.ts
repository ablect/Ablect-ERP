import { create } from "zustand";
import type { Product } from "../types/Product";

type ProductState = {
  products: Product[];
  selectedProduct: Product | null;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  selectProduct: (product: Product | null) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  selectedProduct: null,
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((item) => (item.id === product.id ? product : item)),
      selectedProduct:
        state.selectedProduct?.id === product.id ? product : state.selectedProduct,
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((item) => item.id !== id),
      selectedProduct: state.selectedProduct?.id === id ? null : state.selectedProduct,
    })),
  selectProduct: (product) => set({ selectedProduct: product }),
}));
