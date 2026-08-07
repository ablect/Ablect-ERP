import ExecutiveDashboardHeader

from "./ExecutiveDashboardHeader";

import KPIGrid

from "./KPIGrid";

export default function ExecutiveDashboard(){

return(

<div className="space-y-8">

<ExecutiveDashboardHeader/>

<KPIGrid/>

</div>

);

}