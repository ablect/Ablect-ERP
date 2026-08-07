import {

useSupplierAnalytics

}

from "./useSupplierAnalytics";

export function useSupplierTrendChart(){

const{

data,

}=

useSupplierAnalytics();

return{

series:[

{

id:"purchases",

label:"Purchases",

data:data.map(item=>({

label:item.period,

value:item.purchaseValue,

})),

},

],

};

}