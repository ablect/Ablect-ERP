import {

useInventoryAnalytics

}

from "./useInventoryAnalytics";

export function useInventorySummary(){

const{

data,

}=

useInventoryAnalytics();

const stockValue=

data.reduce(

(sum,item)=>

sum+item.stockValue,

0,

);

const stockIn=

data.reduce(

(sum,item)=>

sum+item.stockIn,

0,

);

const stockOut=

data.reduce(

(sum,item)=>

sum+item.stockOut,

0,

);

const turnover=

data.reduce(

(sum,item)=>

sum+item.turnover,

0,

);

return{

stockValue,

stockIn,

stockOut,

turnover,

};

}