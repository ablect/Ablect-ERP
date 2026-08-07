import {

fixedAssetService

}

from "../services/FixedAssetService";

import {

useFixedAssetStore

}

from "../store/FixedAssetStore";

export function useDeleteFixedAsset(){

async function remove(

id:string,

){

const assets=

await fixedAssetService.delete(

id,

);

useFixedAssetStore

.getState()

.setAssets(

assets,

);

}

return{

remove,

};

}