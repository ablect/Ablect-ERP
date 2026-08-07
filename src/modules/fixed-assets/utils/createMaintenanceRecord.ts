import type {

MaintenanceRecord

}

from "../types/MaintenanceRecord";

export function createMaintenanceRecord(

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

):MaintenanceRecord{

return{

id:crypto.randomUUID(),

assetId,

maintenanceType,

provider,

scheduledDate,

completedDate,

cost,

description,

status:"Scheduled",

};

}