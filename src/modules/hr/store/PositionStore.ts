import { create }

from "zustand";

import type {

Position

}

from "../types/Position";

type PositionState={

positions:Position[];

setPositions:(

positions:Position[],

)=>void;

};

export const usePositionStore=

create<PositionState>((set)=>({

positions:[],

setPositions(

positions,

){

set({

positions,

});

},

}));