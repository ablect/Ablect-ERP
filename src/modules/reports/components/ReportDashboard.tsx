import {

useReports

}

from "../hooks/useReports";

import ReportCard

from "./ReportCard";

export default function ReportDashboard(){

const{

metrics,

}=

useReports();

return(

<div className="grid gap-4 md:grid-cols-4">

{metrics.map(metric=>(

<ReportCard

key={metric.title}

title={metric.title}

value={metric.value}

/>

))}

</div>

);

}