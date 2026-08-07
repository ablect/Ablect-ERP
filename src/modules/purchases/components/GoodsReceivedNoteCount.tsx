import {

useGoodsReceivedNotes

}

from "../hooks/useGoodsReceivedNotes";

export default function GoodsReceivedNoteCount(){

const{

notes,

}=

useGoodsReceivedNotes();

return(

<p>

Total GRNs:

{" "}

{notes.length}

</p>

);

}