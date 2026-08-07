import {

usePurchaseOrders

}

from "./usePurchaseOrders";

export function usePurchaseStatistics(){

const{

orders,

}=

usePurchaseOrders();

const draft=

orders.filter(

order=>order.status==="Draft"

).length;

const pending=

orders.filter(

order=>order.status==="Pending"

).length;

const approved=

orders.filter(

order=>order.status==="Approved"

).length;

const received=

orders.filter(

order=>order.status==="Received"

).length;

const totalValue=

orders.reduce(

(sum,order)=>

sum+order.total,

0,

);

return{

total:

orders.length,

draft,

pending,

approved,

received,

totalValue,

};

}