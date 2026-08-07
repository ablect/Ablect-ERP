import type {

FixedAsset

}

from "../types/FixedAsset";

export function createFixedAsset(

assetCode:string,

assetName:string,

category:string,

purchaseDate:string,

purchaseCost:number,

usefulLife:number,

salvageValue:number,

location:string,

):FixedAsset{

return{

id:crypto.randomUUID(),

assetCode,

assetName,

category,

purchaseDate,

purchaseCost,

usefulLife,

salvageValue,

currentValue:purchaseCost,

location,

status:"Active",

};

}