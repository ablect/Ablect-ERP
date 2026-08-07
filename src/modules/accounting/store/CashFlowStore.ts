import { create }

from "zustand";

import type {

CashFlowRow

}

from "../types/CashFlowRow";

type CashFlowState={

rows:CashFlowRow[];

setRows:(

rows:CashFlowRow[],

)=>void;

};

export const useCashFlowStore=

create<CashFlowState>((set)=>({

rows:[],

setRows(

rows,

){

set({

rows,

});

},

}));