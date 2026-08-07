import { create } from "zustand";

import type {

  InventoryTransaction,

} from "../types/InventoryTransaction";

type State = {

  transactions: InventoryTransaction[];

  addTransaction: (

    transaction: InventoryTransaction

  ) => void;

};

export const useInventoryTransactionStore =
create<State>((set, get) => ({

  transactions: [],

  addTransaction(transaction) {

    set({

      transactions: [

        ...get().transactions,

        transaction,

      ],

    });

  },

}));