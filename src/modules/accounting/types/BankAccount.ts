export interface BankAccount{

id:string;

name:string;

bankName:string;

accountNumber:string;

currency:string;

openingBalance:number;

currentBalance:number;

status:
|"Active"
|"Inactive";

}