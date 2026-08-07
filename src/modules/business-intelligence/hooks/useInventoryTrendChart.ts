import {

useInventoryAnalytics

}

from "./useInventoryAnalytics";

export function useInventoryTrendChart(){

const{

data,

}=

useInventoryAnalytics();

return{

series:[

{

id:"inventory",

label:"Inventory Value",

data:data.map(item=>({

label:item.period,

value:item.stockValue,

})),

},

],

};

}