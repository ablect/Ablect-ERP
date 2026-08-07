import {

supplierPaymentService

}

from "../services/SupplierPaymentService";

import {

useSupplierPaymentStore

}

from "../store/SupplierPaymentStore";

export function useDeleteSupplierPayment(){

async function remove(

id:string,

){

const payments=

await supplierPaymentService.delete(

id,

);

useSupplierPaymentStore

.getState()

.setPayments(

payments,

);

}

return{

remove,

};

}