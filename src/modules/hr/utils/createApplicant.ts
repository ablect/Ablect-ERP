import type {

Applicant

}

from "../types/Applicant";

export function createApplicant(

fullName:string,

email:string,

phone:string,

position:string,

):Applicant{

return{

id:crypto.randomUUID(),

fullName,

email,

phone,

position,

appliedDate:

new Date()

.toISOString()

.slice(0,10),

stage:"Applied",

};

}