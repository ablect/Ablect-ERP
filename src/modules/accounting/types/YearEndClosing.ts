export interface YearEndClosing{

id:string;

fiscalYearId:string;

closingDate:string;

status:
|"Pending"
|"Completed";

profitOrLoss:number;

retainedEarnings:number;

journalPosted:boolean;

}