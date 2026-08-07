import {

auditLogService

}

from "../services/AuditLogService";

import {

useAuditLogStore

}

from "../store/AuditLogStore";

import type {

AuditLog

}

from "../types/AuditLog";

export function useCreateAuditLog(){

async function create(

log:AuditLog,

){

await auditLogService.save(

log,

);

useAuditLogStore

.getState()

.addLog(

log,

);

}

return{

create,

};

}