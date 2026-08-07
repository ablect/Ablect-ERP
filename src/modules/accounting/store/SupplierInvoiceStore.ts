import { create }

from "zustand";

import type {

SupplierInvoice

}

from "../types/SupplierInvoice";

type SupplierInvoiceState={

invoices:SupplierInvoice[];

setInvoices:(

invoices:SupplierInvoice[],

)=>void;

};

export const useSupplierInvoiceStore=

create<SupplierInvoiceState>((set)=>({

invoices:[],

setInvoices(

invoices,

){

set({

invoices,

});

},

}));