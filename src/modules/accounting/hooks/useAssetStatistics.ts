import {

useFixedAssets

}

from "./useFixedAssets";

export function useAssetStatistics(){

const{

assets,

}=

useFixedAssets();

const totalCost=

assets.reduce(

(sum,item)=>

sum+item.purchaseCost,

0,

);

const totalBookValue=

assets.reduce(

(sum,item)=>

sum+item.currentValue,

0,

);

return{

totalAssets:

assets.length,

totalCost,

totalBookValue,

};

}