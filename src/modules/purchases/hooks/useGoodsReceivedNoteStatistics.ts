import {

useGoodsReceivedNotes

}

from "./useGoodsReceivedNotes";

export function useGoodsReceivedNoteStatistics(){

const{

notes,

}=

useGoodsReceivedNotes();

const pending=

notes.filter(

note=>note.status==="Pending",

).length;

const received=

notes.filter(

note=>note.status==="Received",

).length;

const cancelled=

notes.filter(

note=>note.status==="Cancelled",

).length;

return{

total:notes.length,

pending,

received,

cancelled,

};

}