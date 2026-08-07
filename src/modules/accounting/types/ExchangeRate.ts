export interface ExchangeRate{

id:string;

baseCurrency:string;

targetCurrency:string;

rate:number;

effectiveDate:string;

status:
|"Active"
|"Expired";

}