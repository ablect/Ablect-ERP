import {

useApplySupplierPayment

}

from "./useApplySupplierPayment";

import {

usePostSupplierPayment

}

from "./usePostSupplierPayment";

export function useProcessSupplierPayment(){

const{

apply,

}=

useApplySupplierPayment();

const{

post,

}=

usePostSupplierPayment();

async function process(

paymentId:string,

invoiceId:string,

amount:number,

){

await apply(

invoiceId,

amount,

);

await post(

paymentId,

amount,

);

}

return{

process,

};

}