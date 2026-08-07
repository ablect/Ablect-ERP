import {

useRecommendations

}

from "../hooks/useRecommendations";

import RecommendationCard

from "./RecommendationCard";

export default function RecommendationsPanel(){

const{

recommendations,

}=

useRecommendations();

return(

<div className="space-y-4">

{recommendations.map(item=>(

<RecommendationCard

key={item.id}

recommendation={item}

/>

))}

</div>

);

}