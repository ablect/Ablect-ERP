export interface Attendance{

  id:string;

  employeeId:string;

  date:string;

  clockIn:string;

  clockOut:string;

  status:
    |"Present"
    |"Absent"
    |"Late"
    |"Leave";

}