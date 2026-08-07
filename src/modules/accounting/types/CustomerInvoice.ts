export interface CustomerInvoice{

id:string;

invoiceNumber:string;

customerId:string;

salesOrderId:string;

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