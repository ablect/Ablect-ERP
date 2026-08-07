export interface Currency{

id:string;

code:string;

name:string;

symbol:string;

decimalPlaces:number;

isBaseCurrency:boolean;

status:
|"Active"
|"Inactive";

}