export interface Leave{

  id:string;

  employeeId:string;

  leaveType:
    |"Annual"
    |"Sick"
    |"Maternity"
    |"Paternity"
    |"Casual"
    |"Study";

  startDate:string;

  endDate:string;

  reason:string;

  status:
    |"Pending"
    |"Approved"
    |"Rejected";

}