import {

useInsights

}

from "../hooks/useInsights";

import InsightCard

from "./InsightCard";

export default function InsightsPanel(){

const{

insights,

}=

useInsights();

return(

<div className="space-y-4">

{insights.map(item=>(

<InsightCard

key={item.id}

insight={item}

/>

))}

</div>

);

}