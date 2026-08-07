import type {

DepreciationRecord

}

from "../types/DepreciationRecord";

let records:DepreciationRecord[]=[];

export const depreciationService={

async getAll(){

return records;

},

async create(

record:DepreciationRecord,

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