import { create } from "zustand";

import type {

LedgerEntry

}

from "../types/LedgerEntry";

type LedgerState={

entries:LedgerEntry[];

setEntries:(

entries:LedgerEntry[],

)=>void;

};

export const useLedgerStore=

create<LedgerState>((set)=>({

entries:[],

setEntries(entries){

set({

entries,

});

},

}));