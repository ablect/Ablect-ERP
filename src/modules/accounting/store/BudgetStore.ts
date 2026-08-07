import { create }

from "zustand";

import type {

Budget

}

from "../types/Budget";

import type {

BudgetLine

}

from "../types/BudgetLine";

type BudgetState={

budgets:Budget[];

lines:BudgetLine[];

setBudgets:(

budgets:Budget[],

)=>void;

setLines:(

lines:BudgetLine[],

)=>void;

};

export const useBudgetStore=

create<BudgetState>((set)=>({

budgets:[],

lines:[],

setBudgets(budgets){

set({budgets});

},

setLines(lines){

set({lines});

},

}));