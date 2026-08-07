export interface Applicant{

  id:string;

  fullName:string;

  email:string;

  phone:string;

  position:string;

  appliedDate:string;

  stage:
    |"Applied"
    |"Screening"
    |"Interview"
    |"Offer"
    |"Hired"
    |"Rejected";

}