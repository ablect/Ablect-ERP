export interface FixedAsset{

id:string;

assetCode:string;

assetName:string;

categoryId:string;

purchaseDate:string;

purchaseCost:number;

salvageValue:number;

usefulLife:number;

depreciationMethod:
|"Straight Line"
|"Declining Balance"
|"Units of Production";

currentValue:number;

status:
|"Active"
|"Disposed";

}