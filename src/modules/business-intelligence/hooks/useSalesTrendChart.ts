import {

useSalesAnalytics

}

from "./useSalesAnalytics";

export function useSalesTrendChart(){

const{

data,

}=

useSalesAnalytics();

return{

series:[

{

id:"sales",

label:"Sales",

data:data.map(item=>({

label:item.period,

value:item.sales,

})),

},

],

};

}