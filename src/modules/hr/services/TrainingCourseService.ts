import type {

TrainingCourse

}

from "../types/TrainingCourse";

let courses:TrainingCourse[]=[];

export const trainingCourseService={

async getAll(){

return courses;

},

async create(

course:TrainingCourse,

){

courses=[

...courses,

course,

];

return courses;

},

async delete(

id:string,

){

courses=

courses.filter(

course=>

course.id!==id,

);

return courses;

},

};