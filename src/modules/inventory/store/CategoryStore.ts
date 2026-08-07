import { create } from "zustand";
import type { Category } from "../types/Category";

type CategoryState = {

  categories: Category[];

  setCategories: (
    categories: Category[]
  ) => void;

  addCategory: (
    category: Category
  ) => void;

};

export const useCategoryStore =
create<CategoryState>((set)=>({

  categories: [],

  setCategories(categories){

    set({ categories });

  },

  addCategory(category){

    set((state)=>({

      categories:[
        ...state.categories,
        category
      ]

    }));

  }

}));