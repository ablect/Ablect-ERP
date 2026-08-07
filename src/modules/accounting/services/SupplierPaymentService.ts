import type {

SupplierPayment

}

from "../types/SupplierPayment";

let payments:SupplierPayment[]=[];

export const supplierPaymentService={

async getAll(){

return payments;

},

async create(

payment:SupplierPayment,

){

payments=[

...payments,

payment,

];

return payments;

},

async delete(

id:string,

){

payments=

payments.filter(

payment=>

payment.id!==id,

);

return payments;

},

};