import type {

DateRange

}

from "../types/DateRange";

export function resolveDateRange(

range:DateRange,

){

return{

from:range.from,

to:range.to,

};

}