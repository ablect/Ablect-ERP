import {

useAuditLogs

}

from "./useAuditLogs";

export function useAuditStatistics(){

const{

logs,

}=

useAuditLogs();

return{

total:logs.length,

success:

logs.filter(

item=>

item.status==="Success",

).length,

failed:

logs.filter(

item=>

item.status==="Failed",

).length,

};

}