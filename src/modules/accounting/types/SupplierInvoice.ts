export interface SupplierInvoice{

id:string;

invoiceNumber:string;

supplierId:string;

purchaseOrderId:string;

invoiceDate:string;

dueDate:string;

amount:number;

paid:number;

balance:number;

status:
|"Pending"
|"Partially Paid"
|"Paid"
|"Overdue";

}