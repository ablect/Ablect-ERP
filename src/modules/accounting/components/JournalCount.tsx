import {

useJournalEntries

}

from "../hooks/useJournalEntries";

export default function JournalCount(){

const{

entries,

}=

useJournalEntries();

return(

<p>

Total Journal Entries:

{" "}

{entries.length}

</p>

);

}