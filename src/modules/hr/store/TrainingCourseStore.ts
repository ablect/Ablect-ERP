import { create }

from "zustand";

import type {

TrainingCourse

}

from "../types/TrainingCourse";

type TrainingCourseState={

courses:TrainingCourse[];

setCourses:(

courses:TrainingCourse[],

)=>void;

};

export const useTrainingCourseStore=

create<TrainingCourseState>((set)=>({

courses:[],

setCourses(

courses,

){

set({

courses,

});

},

}));