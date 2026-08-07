import {

createEmployeeAsset

}

from "../utils/createEmployeeAsset";

import {

employeeAssetService

}

from "../services/EmployeeAssetService";

import {

useEmployeeAssetStore

}

from "../store/EmployeeAssetStore";

export function useCreateEmployeeAsset(){

async function create(

employeeId:string,

assetName:string,

assetCategory:string,

serialNumber:string,

){

const asset=

createEmployeeAsset(

employeeId,

assetName,

assetCategory,

serialNumber,

);

const assets=

await employeeAssetService.create(

asset,

);

useEmployeeAssetStore

.getState()

.setAssets(

assets,

);

}

return{

create,

};

}