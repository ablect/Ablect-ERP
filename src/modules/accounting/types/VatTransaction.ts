export interface VatTransaction{

id:string;

reference:string;

date:string;

customerId?:string;

supplierId?:string;

transactionType:
|"Sale"
|"Purchase";

taxableAmount:number;

vatRate:number;

vatAmount:number;

status:
|"Pending"
|"Filed";

}