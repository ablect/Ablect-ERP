import { create } from "zustand";

type ProductSearchState = {

  keyword: string;

  setKeyword: (keyword: string) => void;

};

export const useProductSearchStore =
create<ProductSearchState>((set) => ({

  keyword: "",

  setKeyword(keyword) {

    set({

      keyword,

    });

  },

}));