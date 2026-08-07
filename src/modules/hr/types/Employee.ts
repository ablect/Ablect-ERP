export interface Employee {

  id: string;

  employeeNumber: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  department: string;

  position: string;

  salary: number;

  status:
    | "Active"
    | "Inactive";

  hiredDate: string;

}