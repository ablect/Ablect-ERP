export interface AuditLog{

id:string;

timestamp:string;

userId:string;

userName:string;

module:string;

action:string;

entity:string;

entityId:string;

oldValue?:string;

newValue?:string;

ipAddress?:string;

status:
|"Success"
|"Failed";

}