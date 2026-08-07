import {

useLeaveRequests

}

from "./useLeaveRequests";

export function useLeaveStatistics(){

const{

requests,

}=

useLeaveRequests();

const pending=

requests.filter(

r=>r.status==="Pending",

).length;

const approved=

requests.filter(

r=>r.status==="Approved",

).length;

const rejected=

requests.filter(

r=>r.status==="Rejected",

).length;

return{

total:

requests.length,

pending,

approved,

rejected,

};

}