import {

useFixedAssetStore

}

from "../store/FixedAssetStore";

export function useFixedAssets(){

const{

assets,

setAssets,

}=

useFixedAssetStore();

return{

assets,

setAssets,

};

}