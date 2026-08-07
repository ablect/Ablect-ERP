import type {

Interview

}

from "../types/Interview";

export function createInterview(

applicantId:string,

interviewer:string,

interviewDate:string,

interviewTime:string,

location:string,

):Interview{

return{

id:crypto.randomUUID(),

applicantId,

interviewer,

interviewDate,

interviewTime,

location,

score:0,

result:"Pending",

};

}