import {

useInterviews

}

from "../hooks/useInterviews";

export default function InterviewCount(){

const{

interviews,

}=

useInterviews();

return(

<p>

Total Interviews:

{" "}

{interviews.length}

</p>

);

}