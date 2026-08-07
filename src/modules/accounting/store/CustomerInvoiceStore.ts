import { create }

from "zustand";

import type {

CustomerInvoice

}

from "../types/CustomerInvoice";

type CustomerInvoiceState={

invoices:CustomerInvoice[];

setInvoices:(

invoices:CustomerInvoice[],

)=>void;

};

export const useCustomerInvoiceStore=

create<CustomerInvoiceState>((set)=>({

invoices:[],

setInvoices(

invoices,

){

set({

invoices,

});

},

}));