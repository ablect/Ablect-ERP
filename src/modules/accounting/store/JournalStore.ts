import { create } from "zustand";

import type {

JournalEntry

}

from "../types/JournalEntry";

type JournalState={

entries:JournalEntry[];

setEntries:(

entries:JournalEntry[],

)=>void;

};

export const useJournalStore=

create<JournalState>((set)=>({

entries:[],

setEntries(entries){

set({

entries,

});

},

}));