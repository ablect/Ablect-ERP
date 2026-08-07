import {

purchaseRequisitionService

}

from "../services/PurchaseRequisitionService";

import {

usePurchaseRequisitionStore

}

from "../store/PurchaseRequisitionStore";

export function useDeletePurchaseRequisition(){

async function remove(

id:string,

){

const requisitions=

await purchaseRequisitionService.delete(

id,

);

usePurchaseRequisitionStore

.getState()

.setRequisitions(

requisitions,

);

}

return{

remove,

};

}