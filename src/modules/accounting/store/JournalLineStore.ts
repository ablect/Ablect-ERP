import { create }

from "zustand";

import type {

JournalLine

}

from "../types/JournalLine";

type JournalLineState={

lines:JournalLine[];

setLines:(

lines:JournalLine[],

)=>void;

};

export const useJournalLineStore=

create<JournalLineState>((set)=>({

lines:[],

setLines(

lines,

){

set({

lines,

});

},

}));