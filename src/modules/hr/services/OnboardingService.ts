import type {

Onboarding

}

from "../types/Onboarding";

let records:Onboarding[]=[];

export const onboardingService={

async getAll(){

return records;

},

async create(

record:Onboarding,

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