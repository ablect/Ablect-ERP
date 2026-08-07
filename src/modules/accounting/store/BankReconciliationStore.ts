import { create }

from "zustand";

import type {

BankAccount

}

from "../types/BankAccount";

import type {

BankTransaction

}

from "../types/BankTransaction";

type BankState={

accounts:BankAccount[];

transactions:BankTransaction[];

setAccounts:(

accounts:BankAccount[],

)=>void;

setTransactions:(

transactions:BankTransaction[],

)=>void;

};

export const useBankReconciliationStore=

create<BankState>((set)=>({

accounts:[],

transactions:[],

setAccounts(accounts){

set({accounts});

},

setTransactions(transactions){

set({transactions});

},

}));