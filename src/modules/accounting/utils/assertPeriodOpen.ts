import {

usePeriodLocked

}

from "../hooks/usePeriodLocked";

export function assertPeriodOpen(

periodId:string,

){

if(

usePeriodLocked(

periodId,

)

){

throw new Error(

"Accounting period is closed."

);

}

}