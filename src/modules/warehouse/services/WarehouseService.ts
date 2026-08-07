import type {

Warehouse

}

from "../types/Warehouse";

let warehouses:Warehouse[]=[];

export const warehouseService={

async getAll(){

return warehouses;

},

async create(

warehouse:Warehouse,

){

warehouses=[

...warehouses,

warehouse,

];

return warehouses;

},

async delete(

id:string,

){

warehouses=

warehouses.filter(

warehouse=>

warehouse.id!==id,

);

return warehouses;

},

};