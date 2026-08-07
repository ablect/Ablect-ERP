import { create }

from "zustand";

import type {

AccountingLedgerEntry

}

from "../types/AccountingLedgerEntry";

type AccountingLedgerState={

entries:AccountingLedgerEntry[];

setEntries:(

entries:AccountingLedgerEntry[],

)=>void;

};

export const useAccountingLedgerStore=

create<AccountingLedgerState>((set)=>({

entries:[],

setEntries(

entries,

){

set({

entries,

});

},

}));