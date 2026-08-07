export interface PurchaseRequisition{

  id:string;

  requisitionNumber:string;

  department:string;

  requestedBy:string;

  requestDate:string;

  requiredDate:string;

  purpose:string;

  total:number;

  status:
    |"Draft"
    |"Pending"
    |"Approved"
    |"Rejected"
    |"Converted";

}