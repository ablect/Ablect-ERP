import { create }

from "zustand";

import type {

ReconciliationResult

}

from "../types/ReconciliationResult";

type State={

results:ReconciliationResult[];

setResults:(

items:ReconciliationResult[],

)=>void;

};

export const useReconciliationResultStore=

create<State>((set)=>({

results:[],

setResults(results){

set({results});

},

}));