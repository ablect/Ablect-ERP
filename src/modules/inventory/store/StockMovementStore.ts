import { create }

from "zustand";

import type {

StockMovement

}

from "../types/StockMovement";

type StockMovementState={

movements:StockMovement[];

setMovements:(

movements:StockMovement[],

)=>void;

};

export const useStockMovementStore=

create<StockMovementState>((set)=>({

movements:[],

setMovements(

movements,

){

set({

movements,

});

},

}));