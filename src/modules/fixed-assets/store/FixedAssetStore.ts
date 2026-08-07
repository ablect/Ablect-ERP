import { create }

from "zustand";

import type {

FixedAsset

}

from "../types/FixedAsset";

type FixedAssetState={

assets:FixedAsset[];

setAssets:(

assets:FixedAsset[],

)=>void;

};

export const useFixedAssetStore=

create<FixedAssetState>((set)=>({

assets:[],

setAssets(

assets,

){

set({

assets,

});

},

}));