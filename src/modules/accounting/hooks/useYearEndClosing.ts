import {

useYearEndClosingStore

}

from "../store/YearEndClosingStore";

import {

useRetainedEarnings

}

from "./useRetainedEarnings";

export function useYearEndClosing(){

const{

retainedEarnings,

}=

useRetainedEarnings();

function closeYear(

fiscalYearId:string,

){

useYearEndClosingStore

.getState()

.setClosings([

{

id:crypto.randomUUID(),

fiscalYearId,

closingDate:

new Date()

.toISOString(),

status:"Completed",

profitOrLoss:

retainedEarnings,

retainedEarnings,

journalPosted:false,

},

]);

}

return{

closeYear,

};

}