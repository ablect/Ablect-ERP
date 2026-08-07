import { create } from "zustand";

export type ProductSortOption =

  | "name"

  | "sku"

  | "price"

  | "quantity";

type ProductSortState = {

  sortBy: ProductSortOption;

  setSortBy: (
    sort: ProductSortOption
  ) => void;

};

export const useProductSortStore =
create<ProductSortState>((set) => ({

  sortBy: "name",

  setSortBy(sortBy) {

    set({

      sortBy,

    });

  },

}));