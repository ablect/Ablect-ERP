export interface PurchaseOrder{

id:string;

supplierId:string;

total:number;

status:
"pending"|
"received"|
"cancelled";

createdAt:Date;

}