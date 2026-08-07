import type {

Leave

}

from "../types/Leave";

export function createLeave(

employeeId:string,

leaveType:Leave["leaveType"],

startDate:string,

endDate:string,

reason:string,

):Leave{

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