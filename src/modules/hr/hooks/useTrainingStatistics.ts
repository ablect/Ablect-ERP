import {

useTrainingCourses

}

from "./useTrainingCourses";

export function useTrainingStatistics(){

const{

courses,

}=

useTrainingCourses();

const scheduled=

courses.filter(

c=>c.status==="Scheduled",

).length;

const ongoing=

courses.filter(

c=>c.status==="Ongoing",

).length;

const completed=

courses.filter(

c=>c.status==="Completed",

).length;

return{

total:

courses.length,

scheduled,

ongoing,

completed,

};

}