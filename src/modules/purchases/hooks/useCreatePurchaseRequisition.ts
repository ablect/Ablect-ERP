import {

createPurchaseRequisition

}

from "../utils/createPurchaseRequisiton";

import {

purchaseRequisitionService

}

from "../services/PurchaseRequisitionService";

import {

usePurchaseRequisitionStore

}

from "../store/PurchaseRequisitionStore";

export function useCreatePurchaseRequisition(){

async function create(

requisitionNumber:string,

department:string,

requestedBy:string,

requestDate:string,

requiredDate:string,

purpose:string,

total:number,

){

const requisition=

createPurchaseRequisition(

requisitionNumber,

department,

requestedBy,

requestDate,

requiredDate,

purpose,

total,

);

const requisitions=

await purchaseRequisitionService.create(

requisition,

);

usePurchaseRequisitionStore

.getState()

.setRequisitions(

requisitions,

);

}

return{

create,

};

}