import { create }

from "zustand";

import type {

DepreciationRecord

}

from "../types/DepreciationRecord";

type DepreciationState={

records:DepreciationRecord[];

setRecords:(

records:DepreciationRecord[],

)=>void;

};

export const useDepreciationStore=

create<DepreciationState>((set)=>({

records:[],

setRecords(

records,

){

set({

records,

});

},

}));