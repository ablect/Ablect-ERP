import {

useFixedAssets

}

from "./useFixedAssets";

export function useFixedAssetStatistics(){

const{

assets,

}=

useFixedAssets();

const active=

assets.filter(

a=>a.status==="Active",

).length;

const maintenance=

assets.filter(

a=>a.status==="Maintenance",

).length;

const disposed=

assets.filter(

a=>a.status==="Disposed",

).length;

const totalValue=

assets.reduce(

(sum,a)=>

sum+a.currentValue,

0,

);

return{

total:

assets.length,

active,

maintenance,

disposed,

totalValue,

};

}