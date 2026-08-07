import {

useRevenueAnalytics

}

from "./useRevenueAnalytics";

export function useRevenueSummary(){

const{

data,

}=

useRevenueAnalytics();

const revenue=

data.reduce(

(sum,item)=>

sum+item.revenue,

0,

);

const cost=

data.reduce(

(sum,item)=>

sum+item.cost,

0,

);

const profit=

data.reduce(

(sum,item)=>

sum+item.profit,

0,

);

return{

revenue,

cost,

profit,

};

}