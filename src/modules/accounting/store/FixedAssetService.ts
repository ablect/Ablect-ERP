import type {

FixedAsset

}

from "../types/FixedAsset";

let assets:FixedAsset[]=[];

export const fixedAssetService={

async getAll(){

return assets;

},

async save(

items:FixedAsset[],

){

assets=items;

return assets;

},

};