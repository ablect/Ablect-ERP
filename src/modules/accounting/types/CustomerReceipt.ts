export interface CustomerReceipt{

id:string;

receiptNumber:string;

invoiceId:string;

customerId:string;

receiptDate:string;

amount:number;

method:
|"Cash"
|"Bank Transfer"
|"Cheque"
|"POS"
|"Mobile Money";

reference:string;

remarks:string;

}