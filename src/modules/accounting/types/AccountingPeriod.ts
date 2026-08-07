export interface AccountingPeriod{

id:string;

fiscalYearId:string;

name:string;

startDate:string;

endDate:string;

status:
|"Open"
|"Closed";

}