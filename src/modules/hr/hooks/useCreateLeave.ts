import {

createLeave

}

from "../utils/createLeave";

import {

leaveService

}

from "../services/LeaveService";

import {

useLeaveStore

}

from "../store/LeaveStore";

import type {

Leave

}

from "../types/Leave";

export function useCreateLeave(){

async function create(

employeeId:string,

leaveType:Leave["leaveType"],

startDate:string,

endDate:string,

reason:string,

){

const leave=

createLeave(

employeeId,

leaveType,

startDate,

endDate,

reason,

);

const leaves=

await leaveService.create(

leave,

);

useLeaveStore

.getState()

.setLeaves(

leaves,

);

}

return{

create,

};

}