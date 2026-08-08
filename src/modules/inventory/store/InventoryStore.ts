import { create } from "zustand";

import type {
  InventoryItem,
} from "../types/InventoryItem";

type InventoryState = {
  items: InventoryItem[];

  setItems: (
    items: InventoryItem[],
  ) => void;
};

export const useInventoryStore =
  create<InventoryState>((set) => ({
    items: [],

    setItems(items) {
      set({
        items,
      });
    },
  }));