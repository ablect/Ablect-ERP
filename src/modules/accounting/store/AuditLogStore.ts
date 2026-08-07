import { create }

from "zustand";

import type {

AuditLog

}

from "../types/AuditLog";

type AuditState={

logs:AuditLog[];

setLogs:(

logs:AuditLog[],

)=>void;

addLog:(

log:AuditLog,

)=>void;

};

export const useAuditLogStore=

create<AuditState>((set)=>({

logs:[],

setLogs(logs){

set({logs});

},

addLog(log){

set(state=>({

logs:[

log,

...state.logs,

],

}));

},

}));