import {

useOpenRecommendations

}

from "../hooks/useOpenRecommendations";

export default function OpenRecommendationsCounter(){

const items=

useOpenRecommendations();

return(

<span>

{items.length}

Open Recommendations

</span>

);

}