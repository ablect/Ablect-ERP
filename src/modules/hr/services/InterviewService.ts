import type {

Interview

}

from "../types/Interview";

let interviews:Interview[]=[];

export const interviewService={

async getAll(){

return interviews;

},

async create(

interview:Interview,

){

interviews=[

...interviews,

interview,

];

return interviews;

},

async delete(

id:string,

){

interviews=

interviews.filter(

interview=>

interview.id!==id,

);

return interviews;

},

};