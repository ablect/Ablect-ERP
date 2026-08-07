import { create }

from "zustand";

import type {

SupplierPayment

}

from "../types/SupplierPayment";

type SupplierPaymentState={

payments:SupplierPayment[];

setPayments:(

payments:SupplierPayment[],

)=>void;

};

export const useSupplierPaymentStore=

create<SupplierPaymentState>((set)=>({

payments:[],

setPayments(

payments,

){

set({

payments,

});

},

}));