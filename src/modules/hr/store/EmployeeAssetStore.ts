import { create }

from "zustand";

import type {

EmployeeAsset

}

from "../types/EmployeeAsset";

type EmployeeAssetState={

assets:EmployeeAsset[];

setAssets:(

assets:EmployeeAsset[],

)=>void;

};

export const useEmployeeAssetStore=

create<EmployeeAssetState>((set)=>({

assets:[],

setAssets(

assets,

){

set({

assets,

});

},

}));