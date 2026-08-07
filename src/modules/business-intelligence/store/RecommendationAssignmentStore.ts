import { create }

from "zustand";

import type {

RecommendationAssignment

}

from "../types/RecommendationAssignment";

type State={

assignments:RecommendationAssignment[];

assign:(

assignment:RecommendationAssignment,

)=>void;

};

export const useRecommendationAssignmentStore=

create<State>((set)=>({

assignments:[],

assign(assignment){

set(state=>({

assignments:[

...state.assignments,

assignment,

],

}));

},

}));