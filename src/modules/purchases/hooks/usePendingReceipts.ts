import {

useGoodsReceivedNotes

}

from "./useGoodsReceivedNotes";

export function usePendingReceipts(){

const{

notes,

}=

useGoodsReceivedNotes();

return{

pending:

notes.filter(

note=>note.status==="Pending",

),

};

}