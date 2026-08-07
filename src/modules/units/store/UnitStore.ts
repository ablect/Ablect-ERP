import { create } from "zustand";

import type { Unit } from "../types/Unit";

type UnitState = {

  units: Unit[];

  setUnits: (units: Unit[]) => void;

  addUnit: (unit: Unit) => void;

};

export const useUnitStore = create<UnitState>((set, get) => ({

  units: [],

  setUnits(units) {

    set({ units });

  },

  addUnit(unit) {

    set({

      units: [

        ...get().units,

        unit,

      ],

    });

  },

}));