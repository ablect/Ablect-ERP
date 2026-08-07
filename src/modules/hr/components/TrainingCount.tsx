import {

useTrainingCourses

}

from "../hooks/useTrainingCourses";

export default function TrainingCount(){

const{

courses,

}=

useTrainingCourses();

return(

<p>

Total Courses:

{" "}

{courses.length}

</p>

);

}