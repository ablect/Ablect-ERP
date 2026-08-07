export interface TrialBalanceRow{

accountId:string;

accountCode:string;

accountName:string;

accountType:
|"Asset"
|"Liability"
|"Equity"
|"Revenue"
|"Expense";

debit:number;

credit:number;

}