import {

goodsReceivedNoteService

}

from "../services/GoodsReceivedNoteService";

import {

useGoodsReceivedNoteStore

}

from "../store/GoodsReceivedNoteStore";

export function useReceiveGoods(){

async function receive(

id:string,

){

const notes=

await goodsReceivedNoteService.getAll();

const updated=

notes.map(note=>

note.id===id

?{

...note,

status:"Received",

}

:note

);

useGoodsReceivedNoteStore

.getState()

.setNotes(

updated,

);

}

return{

receive,

};

}