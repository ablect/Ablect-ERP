import { create }

from "zustand";

import type {

ProfitAndLossRow

}

from "../types/ProfitAndLossRow";

type ProfitAndLossState={

rows:ProfitAndLossRow[];

setRows:(

rows:ProfitAndLossRow[],

)=>void;

};

export const useProfitAndLossStore=

create<ProfitAndLossState>((set)=>({

rows:[],

setRows(

rows,

){

set({

rows,

});

},

}));