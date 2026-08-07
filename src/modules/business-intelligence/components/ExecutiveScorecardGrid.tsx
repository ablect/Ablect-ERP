import {

useExecutiveKPIs

}

from "../hooks/useExecutiveKPIs";

import ExecutiveKPICard

from "./ExecutiveKPICard";

export default function ExecutiveScorecardGrid(){

const kpis=

useExecutiveKPIs();

return(

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

{kpis.map(kpi=>(

<ExecutiveKPICard

key={kpi.id}

title={kpi.title}

value={kpi.value}

route={kpi.route}

category={kpi.category}

/>

))}

</div>

);

}