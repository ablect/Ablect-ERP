import { create }

from "zustand";

import type {

PurchaseOrder

}

from "../types/PurchaseOrder";

type PurchaseState={

orders:PurchaseOrder[];

setOrders:(

orders:PurchaseOrder[],

)=>void;

};

export const usePurchaseStore=

create<PurchaseState>((set)=>({

orders:[],

setOrders(

orders,

){

set({

orders,

});

},

}));