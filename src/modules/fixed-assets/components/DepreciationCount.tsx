import {

useDepreciationRecords

}

from "../hooks/useDepreciationRecords";

export default function DepreciationCount(){

const{

records,

}=

useDepreciationRecords();

return(

<p>

Total Records:

{" "}

{records.length}

</p>

);

}