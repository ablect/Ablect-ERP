import {

useAssignedRecommendations

}

from "../hooks/useAssignedRecommendations";

export default function AssignedRecommendationsPanel(){

const assignments=

useAssignedRecommendations();

return(

<div>

<h3>

Assignments

</h3>

<p>

{assignments.length}

</p>

</div>

);

}