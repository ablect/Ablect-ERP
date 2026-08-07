import {

createMaintenanceRecord

}

from "../utils/createMaintenanceRecord";

import {

maintenanceService

}

from "../services/MaintenanceService";

import {

useMaintenanceStore

}

from "../store/MaintenanceStore";

export function useCreateMaintenanceRecord(){

async function create(

assetId:string,

maintenanceType:

"Preventive"

|

"Corrective",

provider:string,

scheduledDate:string,

completedDate:string,

cost:number,

description:string,

){

const record=

createMaintenanceRecord(

assetId,

maintenanceType,

provider,

scheduledDate,

completedDate,

cost,

description,

);

const records=

await maintenanceService.create(

record,

);

useMaintenanceStore

.getState()

.setRecords(

records,

);

}

return{

create,

};

}