export interface TrainingCourse{

  id:string;

  title:string;

  trainer:string;

  category:string;

  duration:number;

  startDate:string;

  endDate:string;

  status:
    |"Scheduled"
    |"Ongoing"
    |"Completed";

}