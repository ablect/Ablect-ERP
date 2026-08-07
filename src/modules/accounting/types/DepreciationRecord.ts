export interface DepreciationRecord{

id:string;

assetId:string;

period:string;

method:
|"Straight Line"
|"Declining Balance"
|"Units of Production";

depreciation:number;

accumulatedDepreciation:number;

bookValue:number;

posted:boolean;

}