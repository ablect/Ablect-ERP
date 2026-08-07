import ChartCard

from "../../../components/charts/ChartCard";

import ChartEmpty

from "../../../components/charts/ChartEmpty";

import LineChart

from "../../../components/charts/LineChart";

import {

useInventoryTrendChart

}

from "../hooks/useInventoryTrendChart";

export default function InventoryTrendChart(){

const{

series,

}=

useInventoryTrendChart();

return(

<ChartCard

title="Inventory Value Trend"

>

{

series.length===0

?

<ChartEmpty/>

:

<LineChart

series={series}

/>

}

</ChartCard>

);

}