import Card

from "../../../components/ui/Card";

import type {

KPI

}

from "../types/KPI";

type Props={

kpi:KPI;

};

export default function KPICard({

kpi,

}:Props){

return(

<Card>

<div className="space-y-2">

<h3 className="font-semibold">

{kpi.title}

</h3>

<p className="text-2xl font-bold">

{kpi.value.toLocaleString()}

</p>

<p>

{kpi.change}%

</p>

</div>

</Card>

);

}