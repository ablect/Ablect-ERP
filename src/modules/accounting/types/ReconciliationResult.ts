export interface ReconciliationResult{

transactionId:string;

ledgerReference:string;

bankReference:string;

matched:boolean;

difference:number;

remarks:string;

}