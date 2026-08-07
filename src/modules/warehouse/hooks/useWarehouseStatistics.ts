import {

useWarehouses

}

from "./useWarehouses";

export function useWarehouseStatistics(){

const{

warehouses,

}=

useWarehouses();

const active=

warehouses.filter(

w=>w.status==="Active",

).length;

const inactive=

warehouses.filter(

w=>w.status==="Inactive",

).length;

const totalCapacity=

warehouses.reduce(

(sum,w)=>

sum+w.capacity,

0,

);

const occupiedCapacity=

warehouses.reduce(

(sum,w)=>

sum+w.currentStock,

0,

);

return{

total:

warehouses.length,

active,

inactive,

totalCapacity,

occupiedCapacity,

};

}