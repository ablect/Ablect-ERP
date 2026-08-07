export interface AssetCategory{

id:string;

name:string;

description:string;

defaultUsefulLife:number;

defaultDepreciationMethod:
|"Straight Line"
|"Declining Balance"
|"Units of Production";

}