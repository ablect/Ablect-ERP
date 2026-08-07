import {

useLeaves

}

from "../hooks/useLeaves";

export default function LeaveCount(){

const{

leaves,

}=

useLeaves();

return(

<p>

Total Leave Requests:

{" "}

{leaves.length}

</p>

);

}