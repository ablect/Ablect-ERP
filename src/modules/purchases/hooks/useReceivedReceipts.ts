import {

useGoodsReceivedNotes

}

from "./useGoodsReceivedNotes";

export function useReceivedReceipts(){

const{

notes,

}=

useGoodsReceivedNotes();

return{

received:

notes.filter(

note=>note.status==="Received",

),

};

}