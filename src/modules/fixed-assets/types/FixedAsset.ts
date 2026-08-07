export interface FixedAsset{

  id:string;

  assetCode:string;

  assetName:string;

  category:string;

  purchaseDate:string;

  purchaseCost:number;

  usefulLife:number;

  salvageValue:number;

  currentValue:number;

  location:string;

  status:
    |"Active"
    |"Maintenance"
    |"Disposed";

}