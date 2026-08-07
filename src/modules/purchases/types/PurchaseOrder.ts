export interface PurchaseOrder{

  id:string;

  poNumber:string;

  supplierId:string;

  orderDate:string;

  expectedDate:string;

  total:number;

  status:
    |"Draft"
    |"Pending"
    |"Approved"
    |"Received"
    |"Cancelled";

}