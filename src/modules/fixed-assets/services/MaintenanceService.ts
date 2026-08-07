import type {

MaintenanceRecord

}

from "../types/MaintenanceRecord";

let records:MaintenanceRecord[]=[];

export const maintenanceService={

async getAll(){

return records;

},

async create(

record:MaintenanceRecord,

){

records=[

...records,

record,

];

return records;

},

async delete(

id:string,

){

records=

records.filter(

record=>

record.id!==id,

);

return records;

},

};