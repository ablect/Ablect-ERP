import {

useBusinessInsights,

}

from "../hooks/useBusinessInsights";

import BusinessInsightCard from "./BusinessInsightCard";

export default function BusinessInsightsPanel(){

const{

insights,

}=

useBusinessInsights();

return(

<div className="space-y-4">

{

insights.map(

insight=>(

<BusinessInsightCard

key={insight.id}

insight={insight}

/>

)

)

}

</div>

);

}