import type {

Onboarding

}

from "../types/Onboarding";

export function createOnboarding(

employeeId:string,

department:string,

supervisor:string,

):Onboarding{

return{

id:crypto.randomUUID(),

employeeId,

startDate:

new Date()

.toISOString()

.slice(0,10),

department,

supervisor,

progress:0,

status:"Pending",

};

}