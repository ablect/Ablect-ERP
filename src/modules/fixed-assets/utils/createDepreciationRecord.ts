import type {

DepreciationRecord

}

from "../types/DepreciationRecord";

export function createDepreciationRecord(

assetId:string,

depreciationDate:string,

method:

"Straight Line"

|

"Reducing Balance",

depreciationAmount:number,

accumulatedDepreciation:number,

bookValue:number,

):DepreciationRecord{

return{

id:crypto.randomUUID(),

assetId,

depreciationDate,

method,

depreciationAmount,

accumulatedDepreciation,

bookValue,

};

}