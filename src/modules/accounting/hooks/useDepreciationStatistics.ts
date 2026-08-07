import {

useDepreciation

}

from "./useDepreciation";

export function useDepreciationStatistics(){

const{

records,

}=

useDepreciation();

const total=

records.reduce(

(sum,item)=>

sum+item.depreciation,

0,

);

const accumulated=

records.reduce(

(sum,item)=>

sum+

item.accumulatedDepreciation,

0,

);

return{

entries:

records.length,

total,

accumulated,

};

}