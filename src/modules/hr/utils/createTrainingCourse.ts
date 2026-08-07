import type {

TrainingCourse

}

from "../types/TrainingCourse";

export function createTrainingCourse(

title:string,

trainer:string,

category:string,

duration:number,

startDate:string,

endDate:string,

):TrainingCourse{

return{

id:crypto.randomUUID(),

title,

trainer,

category,

duration,

startDate,

endDate,

status:"Scheduled",

};

}