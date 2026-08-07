import type {

AuditLog

}

from "../types/AuditLog";

let logs:AuditLog[]=[];

export const auditLogService={

async getAll(){

return logs;

},

async save(

log:AuditLog,

){

logs=[

log,

...logs,

];

return log;

},

};