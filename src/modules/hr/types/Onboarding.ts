export interface Onboarding{

  id:string;

  employeeId:string;

  startDate:string;

  department:string;

  supervisor:string;

  progress:number;

  status:
    |"Pending"
    |"In Progress"
    |"Completed";

}