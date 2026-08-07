export interface CashFlowRow{

id:string;

accountId:string;

accountCode:string;

accountName:string;

category:
|"Operating"
|"Investing"
|"Financing";

cashIn:number;

cashOut:number;

netCash:number;

}