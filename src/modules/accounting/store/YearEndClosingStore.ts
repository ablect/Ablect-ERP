import { create }

from "zustand";

import type {

YearEndClosing

}

from "../types/YearEndClosing";

type State={

closings:YearEndClosing[];

setClosings:(

items:YearEndClosing[],

)=>void;

};

export const useYearEndClosingStore=

create<State>((set)=>({

closings:[],

setClosings(

closings,

){

set({

closings,

});

},

}));