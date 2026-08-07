import { create }

from "zustand";

import type {

BalanceSheetRow

}

from "../types/BalanceSheetRow";

type BalanceSheetState={

rows:BalanceSheetRow[];

setRows:(

rows:BalanceSheetRow[],

)=>void;

};

export const useBalanceSheetStore=

create<BalanceSheetState>((set)=>({

rows:[],

setRows(

rows,

){

set({

rows,

});

},

}));