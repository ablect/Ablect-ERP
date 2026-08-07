import {

createInterview

}

from "../utils/createInterview";

import {

interviewService

}

from "../services/InterviewService";

import {

useInterviewStore

}

from "../store/InterviewStore";

export function useCreateInterview(){

async function create(

applicantId:string,

interviewer:string,

interviewDate:string,

interviewTime:string,

location:string,

){

const interview=

createInterview(

applicantId,

interviewer,

interviewDate,

interviewTime,

location,

);

const interviews=

await interviewService.create(

interview,

);

useInterviewStore

.getState()

.setInterviews(

interviews,

);

}

return{

create,

};

}