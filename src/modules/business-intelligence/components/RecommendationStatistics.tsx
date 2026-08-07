import {

useRecommendations

}

from "../hooks/useRecommendations";

export default function RecommendationStatistics(){

const{

recommendations,

}=

useRecommendations();

return(

<div>

Total Recommendations:

{" "}

{recommendations.length}

</div>

);

}