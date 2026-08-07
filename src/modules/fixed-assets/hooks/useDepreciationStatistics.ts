import {

useDepreciationRecords

}

from "./useDepreciationRecords";

export function useDepreciationStatistics(){

const{

records,

}=

useDepreciationRecords();

const totalDepreciation=

records.reduce(

(sum,record)=>

sum+

record.depreciationAmount,

0,

);

const accumulated=

records.reduce(

(sum,record)=>

sum+

record.accumulatedDepreciation,

0,

);

return{

totalRecords:

records.length,

totalDepreciation,

accumulated,

};

}