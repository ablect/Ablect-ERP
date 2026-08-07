export interface Interview{

  id:string;

  applicantId:string;

  interviewer:string;

  interviewDate:string;

  interviewTime:string;

  location:string;

  score:number;

  result:
    |"Pending"
    |"Passed"
    |"Failed";

}