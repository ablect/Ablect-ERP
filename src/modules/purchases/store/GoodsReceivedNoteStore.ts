import { create }

from "zustand";

import type {

GoodsReceivedNote

}

from "../types/GoodsReceivedNote";

type GoodsReceivedNoteState={

notes:GoodsReceivedNote[];

setNotes:(

notes:GoodsReceivedNote[],

)=>void;

};

export const useGoodsReceivedNoteStore=

create<GoodsReceivedNoteState>((set)=>({

notes:[],

setNotes(

notes,

){

set({

notes,

});

},

}));