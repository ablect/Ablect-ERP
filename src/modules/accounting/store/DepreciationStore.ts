import { create }

from "zustand";

import type {

DepreciationRecord

}

from "../types/DepreciationRecord";

type State={

records:DepreciationRecord[];

setRecords:(

records:DepreciationRecord[],

)=>void;

};

export const useDepreciationStore=

create<State>((set)=>({

records:[],

setRecords(records){

set({records});

},

}));