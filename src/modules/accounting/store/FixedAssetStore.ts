import { create }

from "zustand";

import type {

FixedAsset

}

from "../types/FixedAsset";

import type {

AssetCategory

}

from "../types/AssetCategory";

type FixedAssetState={

assets:FixedAsset[];

categories:AssetCategory[];

setAssets:(assets:FixedAsset[])=>void;

setCategories:(categories:AssetCategory[])=>void;

};

export const useFixedAssetStore=

create<FixedAssetState>((set)=>({

assets:[],

categories:[],

setAssets(assets){

set({assets});

},

setCategories(categories){

set({categories});

},

}));