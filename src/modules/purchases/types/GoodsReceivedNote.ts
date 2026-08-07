export interface GoodsReceivedNote{

id:string;

grnNumber:string;

purchaseOrderId:string;

supplierId:string;

warehouseId:string;

receivedBy:string;

receivedDate:string;

remarks:string;

status:
|"Pending"
|"Received"
|"Cancelled";

}