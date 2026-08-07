import {

useFixedAssets

}

from "./useFixedAssets";

import {

straightLineDepreciation

}

from "../utils/straightLineDepreciation";

import {

useDepreciationStore

}

from "../store/DepreciationStore";

export function useGenerateDepreciation(){

const{

assets,

}=

useFixedAssets();

function generate(){

const records=

assets.map(asset=>{

const depreciation=

straightLineDepreciation(

asset.purchaseCost,

asset.salvageValue,

asset.usefulLife,

);

return{

id:crypto.randomUUID(),

assetId:asset.id,

period:new Date()

.toISOString()

.slice(0,7),

method:

asset.depreciationMethod,

depreciation,

accumulatedDepreciation:

depreciation,

bookValue:

asset.purchaseCost-

depreciation,

posted:false,

};

});

useDepreciationStore

.getState()

.setRecords(

records,

);

}

return{

generate,

};

}