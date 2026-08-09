import { create } from "zustand";
import type { Purchase } from "../types/Purchase";

type PurchaseState = {
  orders: Purchase[];
  purchases: Purchase[];
  setOrders: (orders: Purchase[]) => void;
};

export const usePurchaseStore = create<PurchaseState>((set) => ({
  orders: [],
  purchases: [],
  setOrders: (orders) => set({ orders, purchases: orders }),
}));
