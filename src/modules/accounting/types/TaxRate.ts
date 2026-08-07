export interface TaxRate{

id:string;

name:string;

code:string;

percentage:number;

type:
|"VAT"
|"Withholding Tax"
|"Sales Tax"
|"Service Tax";

status:
|"Active"
|"Inactive";

}