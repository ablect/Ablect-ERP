import {

useSalesAnalytics

}

from "./useSalesAnalytics";

export function useSalesSummary(){

const{

data,

}=

useSalesAnalytics();

const totalSales=

data.reduce(

(sum,item)=>

sum+item.sales,

0,

);

const totalOrders=

data.reduce(

(sum,item)=>

sum+item.orders,

0,

);

const totalCustomers=

data.reduce(

(sum,item)=>

sum+item.customers,

0,

);

return{

totalSales,

totalOrders,

totalCustomers,

};

}