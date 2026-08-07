import { create } from "zustand";

type ProductPaginationState = {

  page: number;

  pageSize: number;

  setPage: (page: number) => void;

};

export const useProductPaginationStore =
create<ProductPaginationState>((set) => ({

  page: 1,

  pageSize: 10,

  setPage(page) {

    set({

      page,

    });

  },

}));