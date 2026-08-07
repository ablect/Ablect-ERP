import { create }

from "zustand";

import type {

PurchaseRequisition

}

from "../types/PurchaseRequisition";

type PurchaseRequisitionState={

requisitions:PurchaseRequisition[];

setRequisitions:(

requisitions:PurchaseRequisition[],

)=>void;

};

export const usePurchaseRequisitionStore=

create<PurchaseRequisitionState>((set)=>({

requisitions:[],

setRequisitions(

requisitions,

){

set({

requisitions,

});

},

}));