import type {

GoodsReceivedNote

}

from "../types/GoodsReceivedNote";

export function createGoodsReceivedNote(

grnNumber:string,

purchaseOrderId:string,

supplierId:string,

warehouseId:string,

receivedBy:string,

receivedDate:string,

remarks:string,

):GoodsReceivedNote{

return{

id:crypto.randomUUID(),

grnNumber,

purchaseOrderId,

supplierId,

warehouseId,

receivedBy,

receivedDate,

remarks,

status:"Pending",

};

}