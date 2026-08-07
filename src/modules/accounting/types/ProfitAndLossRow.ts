export interface ProfitAndLossRow{

accountId:string;

accountCode:string;

accountName:string;

amount:number;

type:
|"Revenue"
|"Expense";

}