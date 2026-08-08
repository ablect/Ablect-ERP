import { create } from "zustand";

import type { Sale } from "../types/Sale";

type SalesState = {
  sales: Sale[];

  setSales: (
    sales: Sale[]
  ) => void;

  addSale: (
    sale: Sale
  ) => void;

  updateSale: (
    sale: Sale
  ) => void;

  removeSale: (
    id: string
  ) => void;
};

export const useSalesStore =
  create<SalesState>((set) => ({
    sales: [],

    setSales(sales) {
      set({
        sales,
      });
    },

    addSale(sale) {
      set((state) => ({
        sales: [
          ...state.sales,
          sale,
        ],
      }));
    },

    updateSale(sale) {
      set((state) => ({
        sales: state.sales.map(
          (existingSale) =>
            existingSale.id === sale.id
              ? sale
              : existingSale
        ),
      }));
    },

    removeSale(id) {
      set((state) => ({
        sales: state.sales.filter(
          (sale) =>
            sale.id !== id
        ),
      }));
    },
  }));