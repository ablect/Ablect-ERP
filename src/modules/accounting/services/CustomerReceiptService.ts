import type {

CustomerReceipt

}

from "../types/CustomerReceipt";

let receipts:CustomerReceipt[]=[];

export const customerReceiptService={

async getAll(){

return receipts;

},

async create(

receipt:CustomerReceipt,

){

receipts=[

...receipts,

receipt,

];

return receipts;

},

async delete(

id:string,

){

receipts=

receipts.filter(

receipt=>

receipt.id!==id,

);

return receipts;

},

};