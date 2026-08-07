import {

useCustomerAnalytics

}

from "./useCustomerAnalytics";

export function useCustomerGrowthChart(){

const{

data,

}=

useCustomerAnalytics();

return{

series:[

{

id:"customers",

label:"Customers",

data:data.map(item=>({

label:item.period,

value:item.activeCustomers,

})),

},

],

};

}