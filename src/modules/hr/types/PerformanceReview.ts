export interface PerformanceReview{

  id:string;

  employeeId:string;

  reviewPeriod:string;

  reviewer:string;

  score:number;

  comments:string;

  status:
    |"Draft"
    |"Completed";

}