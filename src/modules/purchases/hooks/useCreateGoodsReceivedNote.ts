import {

createGoodsReceivedNote

}

from "../utils/createGoodsReceivedNote";

import {

goodsReceivedNoteService

}

from "../services/GoodsReceivedNoteService";

import {

useGoodsReceivedNoteStore

}

from "../store/GoodsReceivedNoteStore";

export function useCreateGoodsReceivedNote(){

async function create(

grnNumber:string,

purchaseOrderId:string,

supplierId:string,

warehouseId:string,

receivedBy:string,

receivedDate:string,

remarks:string,

){

const note=

createGoodsReceivedNote(

grnNumber,

purchaseOrderId,

supplierId,

warehouseId,

receivedBy,

receivedDate,

remarks,

);

const notes=

await goodsReceivedNoteService.create(

note,

);

useGoodsReceivedNoteStore

.getState()

.setNotes(

notes,

);

}

return{

create,

};

}