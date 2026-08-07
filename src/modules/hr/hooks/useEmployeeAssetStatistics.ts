import {

useEmployeeAssets

}

from "./useEmployeeAssets";

export function useEmployeeAssetStatistics(){

const{

assets,

}=

useEmployeeAssets();

const assigned=

assets.filter(

asset=>

asset.status==="Assigned",

).length;

const returned=

assets.filter(

asset=>

asset.status==="Returned",

).length;

const lost=

assets.filter(

asset=>

asset.status==="Lost",

).length;

return{

total:

assets.length,

assigned,

returned,

lost,

};

}