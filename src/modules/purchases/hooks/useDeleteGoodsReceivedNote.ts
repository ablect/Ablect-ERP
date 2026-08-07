import {

goodsReceivedNoteService

}

from "../services/GoodsReceivedNoteService";

import {

useGoodsReceivedNoteStore

}

from "../store/GoodsReceivedNoteStore";

export function useDeleteGoodsReceivedNote(){

async function remove(

id:string,

){

const notes=

await goodsReceivedNoteService.delete(

id,

);

useGoodsReceivedNoteStore

.getState()

.setNotes(

notes,

);

}

return{

remove,

};

}