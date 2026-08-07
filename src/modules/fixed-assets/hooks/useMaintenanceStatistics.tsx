import {

useMaintenanceRecords

}

from "./useMaintenanceRecords";

export function useMaintenanceStatistics(){

const{

records,

}=

useMaintenanceRecords();

const scheduled=

records.filter(

r=>r.status==="Scheduled",

).length;

const inProgress=

records.filter(

r=>r.status==="In Progress",

).length;

const completed=

records.filter(

r=>r.status==="Completed",

).length;

const totalCost=

records.reduce(

(sum,r)=>

sum+r.cost,

0,

);

return{

total:

records.length,

scheduled,

inProgress,

completed,

totalCost,

};

}