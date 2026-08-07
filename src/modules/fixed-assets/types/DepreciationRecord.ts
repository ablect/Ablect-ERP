export interface DepreciationRecord{

  id:string;

  assetId:string;

  depreciationDate:string;

  method:
    |"Straight Line"
    |"Reducing Balance";

  depreciationAmount:number;

  accumulatedDepreciation:number;

  bookValue:number;

}