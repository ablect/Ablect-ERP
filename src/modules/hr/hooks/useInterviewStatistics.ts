import {

useInterviews

}

from "./useInterviews";

export function useInterviewStatistics(){

const{

interviews,

}=

useInterviews();

const pending=

interviews.filter(

i=>i.result==="Pending",

).length;

const passed=

interviews.filter(

i=>i.result==="Passed",

).length;

const failed=

interviews.filter(

i=>i.result==="Failed",

).length;

return{

total:

interviews.length,

pending,

passed,

failed,

};

}