import {

trainingCourseService

}

from "../services/TrainingCourseService";

import {

useTrainingCourseStore

}

from "../store/TrainingCourseStore";

export function useDeleteTrainingCourse(){

async function remove(

id:string,

){

const courses=

await trainingCourseService.delete(

id,

);

useTrainingCourseStore

.getState()

.setCourses(

courses,

);

}

return{

remove,

};

}