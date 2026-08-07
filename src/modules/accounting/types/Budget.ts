export interface Budget{

id:string;

name:string;

fiscalYearId:string;

departmentId?:string;

startDate:string;

endDate:string;

status:
|"Draft"
|"Approved"
|"Closed";

}