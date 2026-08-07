import {

useApplyCustomerReceipt

}

from "./useApplyCustomerReceipt";

import {

usePostCustomerReceipt

}

from "./usePostCustomerReceipt";

export function useProcessCustomerReceipt(){

const{

apply,

}=

useApplyCustomerReceipt();

const{

post,

}=

usePostCustomerReceipt();

async function process(

receiptId:string,

invoiceId:string,

amount:number,

){

await apply(

invoiceId,

amount,

);

await post(

receiptId,

amount,

);

}

return{

process,

};

}