import {

warehouseService

}

from "../services/WarehouseService";

import {

useWarehouseStore

}

from "../store/WarehouseStore";

export function useDeleteWarehouse(){

async function remove(

id:string,

){

const warehouses=

await warehouseService.delete(

id,

);

useWarehouseStore

.getState()

.setWarehouses(

warehouses,

);

}

return{

remove,

};

}