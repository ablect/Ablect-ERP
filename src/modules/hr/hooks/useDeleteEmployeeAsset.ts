import {

employeeAssetService

}

from "../services/EmployeeAssetService";

import {

useEmployeeAssetStore

}

from "../store/EmployeeAssetStore";

export function useDeleteEmployeeAsset(){

async function remove(

id:string,

){

const assets=

await employeeAssetService.delete(

id,

);

useEmployeeAssetStore

.getState()

.setAssets(

assets,

);

}

return{

remove,

};

}