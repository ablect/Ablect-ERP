import { create }

from "zustand";

import type {

VatTransaction

}

from "../types/VatTransaction";

type VatState={

transactions:VatTransaction[];

setTransactions:(

transactions:VatTransaction[],

)=>void;

};

export const useVatStore=

create<VatState>((set)=>({

transactions:[],

setTransactions(

transactions,

){

set({

transactions,

});

},

}));