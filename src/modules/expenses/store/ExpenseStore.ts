import { create } from "zustand";

import type { Expense }

from "../types/Expense";

type ExpenseState = {

  expenses: Expense[];

  setExpenses: (

    expenses: Expense[],

  ) => void;

};

export const useExpenseStore =
create<ExpenseState>((set)=>({

  expenses:[],

  setExpenses(expenses){

    set({

      expenses,

    });

  },

}));