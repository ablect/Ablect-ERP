export interface Account{

id:string;

code:string;

name:string;

type:
|"Asset"
|"Liability"
|"Equity"
|"Revenue"
|"Expense";

parentId?:string;

active:boolean;

}