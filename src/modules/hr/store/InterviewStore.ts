import { create }

from "zustand";

import type {

Interview

}

from "../types/Interview";

type InterviewState={

interviews:Interview[];

setInterviews:(

interviews:Interview[],

)=>void;

};

export const useInterviewStore=

create<InterviewState>((set)=>({

interviews:[],

setInterviews(

interviews,

){

set({

interviews,

});

},

}));