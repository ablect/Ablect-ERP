import ChartCard

from "../../../components/charts/ChartCard";

import LineChart

from "../../../components/charts/LineChart";

import ChartEmpty

from "../../../components/charts/ChartEmpty";

import {

useSalesTrendChart

}

from "../hooks/useSalesTrendChart";

export default function SalesTrendChart(){

const{

series,

}=

useSalesTrendChart();

return(

<ChartCard title="Sales Trend">

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