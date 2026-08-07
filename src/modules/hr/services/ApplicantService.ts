import type {

Applicant

}

from "../types/Applicant";

let applicants:Applicant[]=[];

export const applicantService={

async getAll(){

return applicants;

},

async create(

applicant:Applicant,

){

applicants=[

...applicants,

applicant,

];

return applicants;

},

async delete(

id:string,

){

applicants=

applicants.filter(

applicant=>

applicant.id!==id,

);

return applicants;

},

};