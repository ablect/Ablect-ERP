import { create }

from "zustand";

import type {

TrialBalanceRow

}

from "../types/TrialBalanceRow";

type TrialBalanceState={

rows:TrialBalanceRow[];

setRows:(

rows:TrialBalanceRow[],

)=>void;

};

export const useTrialBalanceStore=

create<TrialBalanceState>((set)=>({

rows:[],

setRows(

rows,

){

set({

rows,

});

},

}));