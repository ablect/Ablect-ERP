import ChartCard

from "../../../components/charts/ChartCard";

import ChartEmpty

from "../../../components/charts/ChartEmpty";

import LineChart

from "../../../components/charts/LineChart";

import {

useCustomerGrowthChart

}

from "../hooks/useCustomerGrowthChart";

export default function CustomerGrowthChart(){

const{

series,

}=

useCustomerGrowthChart();

return(

<ChartCard

title="Customer Growth"

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