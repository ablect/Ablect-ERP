import { create }

from "zustand";

import type {

JournalEntry

}

from "../types/JournalEntry";

type JournalEntryState={

entries:JournalEntry[];

setEntries:(

entries:JournalEntry[],

)=>void;

};

export const useJournalEntryStore=

create<JournalEntryState>((set)=>({

entries:[],

setEntries(

entries,

){

set({

entries,

});

},

}));