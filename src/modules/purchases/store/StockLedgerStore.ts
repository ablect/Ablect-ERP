import { create }

from "zustand";

import type {

StockLedgerEntry

}

from "../types/StockLedgerEntry";

type StockLedgerState={

entries:StockLedgerEntry[];

setEntries:(

entries:StockLedgerEntry[],

)=>void;

};

export const useStockLedgerStore=

create<StockLedgerState>((set)=>({

entries:[],

setEntries(

entries,

){

set({

entries,

});

},

}));