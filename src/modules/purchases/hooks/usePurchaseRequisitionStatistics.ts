import {

usePurchaseRequisitions

}

from "./usePurchaseRequisitions";

export function usePurchaseRequisitionStatistics(){

const{

requisitions,

}=

usePurchaseRequisitions();

const draft=

requisitions.filter(

r=>r.status==="Draft",

).length;

const pending=

requisitions.filter(

r=>r.status==="Pending",

).length;

const approved=

requisitions.filter(

r=>r.status==="Approved",

).length;

const totalValue=

requisitions.reduce(

(sum,r)=>

sum+r.total,

0,

);

return{

total:

requisitions.length,

draft,

pending,

approved,

totalValue,

};

}