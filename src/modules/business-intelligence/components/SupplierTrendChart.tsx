import ChartCard

from "../../../components/charts/ChartCard";

import ChartEmpty

from "../../../components/charts/ChartEmpty";

import LineChart

from "../../../components/charts/LineChart";

import {

useSupplierTrendChart

}

from "../hooks/useSupplierTrendChart";

export default function SupplierTrendChart(){

const{

series,

}=

useSupplierTrendChart();

return(

<ChartCard

title="Supplier Purchase Trend"

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