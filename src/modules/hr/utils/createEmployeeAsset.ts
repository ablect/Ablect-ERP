import type {

EmployeeAsset

}

from "../types/EmployeeAsset";

export function createEmployeeAsset(

employeeId:string,

assetName:string,

assetCategory:string,

serialNumber:string,

):EmployeeAsset{

return{

id:crypto.randomUUID(),

employeeId,

assetName,

assetCategory,

serialNumber,

assignedDate:

new Date()

.toISOString()

.slice(0,10),

returnDate:"",

status:"Assigned",

};

}