export interface BalanceSheetRow{

accountId:string;

accountCode:string;

accountName:string;

accountType:
|"Asset"
|"Liability"
|"Equity";

amount:number;

}