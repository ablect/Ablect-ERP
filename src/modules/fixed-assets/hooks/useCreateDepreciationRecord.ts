import {

createDepreciationRecord

}

from "../utils/createDepreciationRecord";

import {

depreciationService

}

from "../services/DepreciationService";

import {

useDepreciationStore

}

from "../store/DepreciationStore";

export function useCreateDepreciationRecord(){

async function create(

assetId:string,

depreciationDate:string,

method:

"Straight Line"

|

"Reducing Balance",

depreciationAmount:number,

accumulatedDepreciation:number,

bookValue:number,

){

const record=

createDepreciationRecord(

assetId,

depreciationDate,

method,

depreciationAmount,

accumulatedDepreciation,

bookValue,

);

const records=

await depreciationService.create(

record,

);

useDepreciationStore

.getState()

.setRecords(

records,

);

}

return{

create,

};

}