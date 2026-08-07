import {

useEffect

}

from "react";

import {

trainingCourseService

}

from "../services/TrainingCourseService";

import {

useTrainingCourseStore

}

from "../store/TrainingCourseStore";

export function useLoadTrainingCourses(){

const{

setCourses,

}=

useTrainingCourseStore();

useEffect(()=>{

async function load(){

const courses=

await trainingCourseService.getAll();

setCourses(

courses,

);

}

load();

},[

setCourses,

]);

}