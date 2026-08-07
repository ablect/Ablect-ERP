import {

useFixedAssetStore

}

from "../store/FixedAssetStore";

export function useAssetCategories(){

const{

categories,

setCategories,

}=

useFixedAssetStore();

return{

categories,

setCategories,

};

}