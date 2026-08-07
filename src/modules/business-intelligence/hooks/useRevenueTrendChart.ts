import {

useRevenueAnalytics

}

from "./useRevenueAnalytics";

export function useRevenueTrendChart(){

const{

data,

}=

useRevenueAnalytics();

return{

series:[

{

id:"revenue",

label:"Revenue",

data:data.map(item=>({

label:item.period,

value:item.revenue,

})),

},

],

};

}