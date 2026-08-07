import { create } from "zustand";
import type { Sale } from "../types/Sale";

type SalesState = {

  sales: Sale[];

  setSales: (sales: Sale[]) => void;

  addSale: (sale: Sale) => void;

};

export const useSalesStore =
create<SalesState>((set, get) => ({

  sales: [],

  setSales(sales) {

    set({ sales });

  },

  addSale(sale) {

    set({

      sales: [

        ...get().sales,

        sale,

      ],

    });

  },

}));