import {

createSupplier

}

from "../utils/createSupplier";

import {

supplierService

}

from "../services/SupplierService";

import {

useSupplierStore

}

from "../store/SupplierStore";

export function useCreateSupplier(){

async function create(

name:string,

contactPerson:string,

phone:string,

email:string,

address:string,

){

const supplier=

createSupplier(

name,

contactPerson,

phone,

email,

address,

);

const suppliers=

await supplierService.create(

supplier,

);

useSupplierStore

.getState()

.setSuppliers(

suppliers,

);

}

return{

create,

};

}