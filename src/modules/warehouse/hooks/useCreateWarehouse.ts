import {

createWarehouse

}

from "../utils/createWarehouse";

import {

warehouseService

}

from "../services/WarehouseService";

import {

useWarehouseStore

}

from "../store/WarehouseStore";

export function useCreateWarehouse(){

async function create(

code:string,

name:string,

location:string,

manager:string,

capacity:number,

){

const warehouse=

createWarehouse(

code,

name,

location,

manager,

capacity,

);

const warehouses=

await warehouseService.create(

warehouse,

);

useWarehouseStore

.getState()

.setWarehouses(

warehouses,

);

}

return{

create,

};

}