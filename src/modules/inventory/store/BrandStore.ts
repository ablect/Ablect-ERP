import { create } from "zustand";
import type { Brand } from "../types/Brand";

type BrandState = {

  brands: Brand[];

  setBrands: (
    brands: Brand[]
  ) => void;

  addBrand: (
    brand: Brand
  ) => void;

};

export const useBrandStore =
create<BrandState>((set)=>({

  brands:[],

  setBrands(brands){

    set({brands});

  },

  addBrand(brand){

    set(state=>({

      brands:[
        ...state.brands,
        brand
      ]

    }));

  }

}));