import type {

PerformanceReview

}

from "../types/PerformanceReview";

export function createPerformanceReview(

employeeId:string,

reviewPeriod:string,

reviewer:string,

score:number,

comments:string,

):PerformanceReview{

return{

id:crypto.randomUUID(),

employeeId,

reviewPeriod,

reviewer,

score,

comments,

status:"Draft",

};

}