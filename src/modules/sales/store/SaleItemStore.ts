import { create } from "zustand";
import type { SaleItem } from "../types/SaleItem";

type SaleItemState = {
  items: SaleItem[];

  setItems: (
    items: SaleItem[],
  ) => void;

  addItem: (
    item: SaleItem,
  ) => void;

  addItems: (
    items: SaleItem[],
  ) => void;

  removeItem: (
    id: string,
  ) => void;

  clearItems: () => void;
};

export const useSaleItemStore =
  create<SaleItemState>(
    (set, get) => ({
      items: [],

      setItems(items) {
        set({ items });
      },

      addItem(item) {
        set({
          items: [
            ...get().items,
            item,
          ],
        });
      },

      addItems(items) {
        set({
          items: [
            ...get().items,
            ...items,
          ],
        });
      },

      removeItem(id) {
        set({
          items:
            get().items.filter(
              (item) =>
                item.id !== id,
            ),
        });
      },

      clearItems() {
        set({
          items: [],
        });
      },
    }),
  );