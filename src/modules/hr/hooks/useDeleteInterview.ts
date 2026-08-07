import {

interviewService

}

from "../services/InterviewService";

import {

useInterviewStore

}

from "../store/InterviewStore";

export function useDeleteInterview(){

async function remove(

id:string,

){

const interviews=

await interviewService.delete(

id,

);

useInterviewStore

.getState()

.setInterviews(

interviews,

);

}

return{

remove,

};

}