import type {

LeaveRequest

}

from "../types/LeaveRequest";

export function createLeaveRequest(

employeeId:string,

leaveType:LeaveRequest["leaveType"],

startDate:string,

endDate:string,

reason:string,

):LeaveRequest{

return{

id:crypto.randomUUID(),

employeeId,

leaveType,

startDate,

endDate,

reason,

status:"Pending",

};

}