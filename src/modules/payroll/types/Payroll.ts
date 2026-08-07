export interface Payroll{

  id:string;

  employeeId:string;

  month:string;

  basicSalary:number;

  allowance:number;

  deduction:number;

  tax:number;

  netSalary:number;

  status:
    |"Draft"
    |"Processed"
    |"Paid";

  paymentDate:string;

}