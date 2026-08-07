import type {

Supplier

}

from "../types/Supplier";

export function createSupplier(

name:string,

contactPerson:string,

phone:string,

email:string,

address:string,

):Supplier{

return{

id:crypto.randomUUID(),

name,

contactPerson,

phone,

email,

address,

active:true,

createdAt:

new Date()

.toISOString(),

};

}