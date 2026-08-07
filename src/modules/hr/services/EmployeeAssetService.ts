import type {

EmployeeAsset

}

from "../types/EmployeeAsset";

let assets:EmployeeAsset[]=[];

export const employeeAssetService={

async getAll(){

return assets;

},

async create(

asset:EmployeeAsset,

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