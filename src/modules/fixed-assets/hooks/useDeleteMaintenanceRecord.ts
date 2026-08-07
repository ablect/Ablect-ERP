import {

maintenanceService

}

from "../services/MaintenanceService";

import {

useMaintenanceStore

}

from "../store/MaintenanceStore";

export function useDeleteMaintenanceRecord(){

async function remove(

id:string,

){

const records=

await maintenanceService.delete(

id,

);

useMaintenanceStore

.getState()

.setRecords(

records,

);

}

return{

remove,

};

}