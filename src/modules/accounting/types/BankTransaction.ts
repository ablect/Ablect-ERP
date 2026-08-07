export interface BankTransaction{

id:string;

bankAccountId:string;

date:string;

reference:string;

description:string;

debit:number;

credit:number;

balance:number;

reconciled:boolean;

}