import { create } from "zustand";

import type { StockTransfer }
from "../types/StockTransfer";

type StockTransferState = {

  transfers: StockTransfer[];

  setTransfers: (
    transfers: StockTransfer[]
  ) => void;

  addTransfer: (
    transfer: StockTransfer
  ) => void;

};

export const useStockTransferStore =
create<StockTransferState>((set, get) => ({

  transfers: [],

  setTransfers(transfers) {

    set({ transfers });

  },

  addTransfer(transfer) {

    set({

      transfers: [

        ...get().transfers,

        transfer,

      ],

    });

  },

}));