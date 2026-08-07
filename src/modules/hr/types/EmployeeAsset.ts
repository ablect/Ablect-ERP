export interface EmployeeAsset{

  id:string;

  employeeId:string;

  assetName:string;

  assetCategory:string;

  serialNumber:string;

  assignedDate:string;

  returnDate:string;

  status:
    |"Assigned"
    |"Returned"
    |"Lost";

}