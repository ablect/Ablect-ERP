export interface SupplierPayment{

id:string;

paymentNumber:string;

invoiceId:string;

supplierId:string;

paymentDate:string;

amount:number;

method:
|"Cash"
|"Bank Transfer"
|"Cheque"
|"Mobile Money";

reference:string;

remarks:string;

}