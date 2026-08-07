import type {

KPIComparison

}

from "../types/KPIComparison";

type Props={

comparison:KPIComparison;

};

export default function KPITrendBadge({

comparison,

}:Props){

return(

<span>

{

comparison.trend==="up"

?"▲"

:

comparison.trend==="down"

?"▼"

:

"■"

}

{" "}

{comparison.changePercent.toFixed(1)}%

</span>

);

}