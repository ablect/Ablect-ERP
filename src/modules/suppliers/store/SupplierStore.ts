import { create } from "zustand";

import type { Supplier }
from "../types/Supplier";

type SupplierState = {

  suppliers: Supplier[];

  setSuppliers: (

    suppliers: Supplier[],

  ) => void;

};

export const useSupplierStore =
create<SupplierState>((set) => ({

  suppliers: [],

  setSuppliers(

    suppliers,

  ) {

    set({

      suppliers,

    });

  },

}));