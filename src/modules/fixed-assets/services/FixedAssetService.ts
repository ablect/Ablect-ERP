import type {

FixedAsset

}

from "../types/FixedAsset";

let assets:FixedAsset[]=[];

export const fixedAssetService={

async getAll(){

return assets;

},

async create(

asset:FixedAsset,

){

assets=[

...assets,

asset,

];

return assets;

},

async delete(

id:string,

){

assets=

assets.filter(

asset=>

asset.id!==id,

);

return assets;

},

};