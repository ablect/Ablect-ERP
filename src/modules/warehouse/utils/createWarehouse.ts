import type {

Warehouse

}

from "../types/Warehouse";

export function createWarehouse(

code:string,

name:string,

location:string,

manager:string,

capacity:number,

):Warehouse{

return{

id:crypto.randomUUID(),

code,

name,

location,

manager,

capacity,

currentStock:0,

status:"Active",

};

}