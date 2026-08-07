import { create } from "zustand";

import type { StockMovement }

from "../types/StockMovement";

type StockMovementState = {

  movements: StockMovement[];

  setMovements: (

    movements: StockMovement[]

  ) => void;

  addMovement: (

    movement: StockMovement

  ) => void;

};

export const useStockMovementStore =

create<StockMovementState>((set, get) => ({

  movements: [],

  setMovements(movements) {

    set({ movements });

  },

  addMovement(movement) {

    set({

      movements: [

        ...get().movements,

        movement,

      ],

    });

  },

}));