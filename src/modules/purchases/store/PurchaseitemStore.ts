import { create } from "zustand";

import type { PurchaseItem }

from "../types/PurchaseItem";

type PurchaseItemState = {

  items: PurchaseItem[];

  setItems: (items: PurchaseItem[]) => void;

  addItem: (item: PurchaseItem) => void;

};

export const usePurchaseItemStore =
create<PurchaseItemState>((set, get) => ({

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

}));