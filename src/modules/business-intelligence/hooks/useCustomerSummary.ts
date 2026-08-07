import {

useCustomerAnalytics

}

from "./useCustomerAnalytics";

export function useCustomerSummary(){

const{

data,

}=

useCustomerAnalytics();

const newCustomers=

data.reduce(

(sum,item)=>

sum+item.newCustomers,

0,

);

const returningCustomers=

data.reduce(

(sum,item)=>

sum+item.returningCustomers,

0,

);

const activeCustomers=

data.reduce(

(sum,item)=>

sum+item.activeCustomers,

0,

);

const lifetimeValue=

data.reduce(

(sum,item)=>

sum+item.customerLifetimeValue,

0,

);

return{

newCustomers,

returningCustomers,

activeCustomers,

lifetimeValue,

};

}