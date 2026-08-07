export interface LeaveRequest{

  id:string;

  employeeId:string;

  leaveType:
    |"Annual"
    |"Sick"
    |"Casual"
    |"Maternity"
    |"Paternity"
    |"Unpaid";

  startDate:string;

  endDate:string;

  reason:string;

  status:
    |"Pending"
    |"Approved"
    |"Rejected";

}