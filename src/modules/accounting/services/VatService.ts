import type {

VatTransaction

}

from "../types/VatTransaction";

let transactions:VatTransaction[]=[];

export const vatService={

async getAll(){

return transactions;

},

async generate(

data:VatTransaction[],

){

transactions=data;

return transactions;

},

};