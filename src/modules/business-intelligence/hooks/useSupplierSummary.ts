import {

useSupplierAnalytics

}

from "./useSupplierAnalytics";

export function useSupplierSummary(){

const{

data,

}=

useSupplierAnalytics();

const purchaseValue=

data.reduce(

(sum,item)=>

sum+item.purchaseValue,

0,

);

const purchaseOrders=

data.reduce(

(sum,item)=>

sum+item.purchaseOrders,

0,

);

const averageRating=

data.length===0

?0

:

data.reduce(

(sum,item)=>

sum+item.supplierRating,

0,

)/data.length;

const deliveryRate=

data.length===0

?0

:

(

data.reduce(

(sum,item)=>

sum+item.onTimeDeliveries,

0,

)

/

(

data.reduce(

(sum,item)=>

sum+

item.onTimeDeliveries+

item.lateDeliveries,

0,

)

||1

)

)*100;

return{

purchaseValue,

purchaseOrders,

averageRating,

deliveryRate,

};

}