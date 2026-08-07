import {

createTrainingCourse

}

from "../utils/createTrainingCourse";

import {

trainingCourseService

}

from "../services/TrainingCourseService";

import {

useTrainingCourseStore

}

from "../store/TrainingCourseStore";

export function useCreateTrainingCourse(){

async function create(

title:string,

trainer:string,

category:string,

duration:number,

startDate:string,

endDate:string,

){

const course=

createTrainingCourse(

title,

trainer,

category,

duration,

startDate,

endDate,

);

const courses=

await trainingCourseService.create(

course,

);

useTrainingCourseStore

.getState()

.setCourses(

courses,

);

}

return{

create,

};

}