import {

createLeaveRequest

}

from "../utils/createLeaveRequest";

import {

leaveService

}

from "../services/LeaveService";

import {

useLeaveStore

}

from "../store/LeaveStore";

import type {

LeaveRequest

}

from "../types/LeaveRequest";

export function useCreateLeaveRequest(){

async function create(

employeeId:string,

leaveType:LeaveRequest["leaveType"],

startDate:string,

endDate:string,

reason:string,

){

const request=

createLeaveRequest(

employeeId,

leaveType,

startDate,

endDate,

reason,

);

const requests=

await leaveService.create(

request,

);

useLeaveStore

.getState()

.setRequests(

requests,

);

}

return{

create,

};

}