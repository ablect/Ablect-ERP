import { create } from "zustand";

import type { StockAdjustment }
from "../types/StockAdjustment";

type StockAdjustmentState = {

  adjustments: StockAdjustment[];

  setAdjustments: (
    adjustments: StockAdjustment[]
  ) => void;

  addAdjustment: (
    adjustment: StockAdjustment
  ) => void;

};

export const useStockAdjustmentStore =
create<StockAdjustmentState>((set, get) => ({

  adjustments: [],

  setAdjustments(adjustments) {

    set({ adjustments });

  },

  addAdjustment(adjustment) {

    set({

      adjustments: [

        ...get().adjustments,

        adjustment,

      ],

    });

  },

}));