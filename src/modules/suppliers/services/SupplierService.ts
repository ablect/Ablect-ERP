import type {

Supplier

}

from "../types/Supplier";

import {

defaultSuppliers

}

from "../utils/defaultSuppliers";

let suppliers=

defaultSuppliers;

export const supplierService={

async getAll(){

return suppliers;

},

async create(

supplier:Supplier,

){

suppliers=[

...suppliers,

supplier,

];

return suppliers;

},

};