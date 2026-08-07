import {

ResponsiveContainer,

PieChart as RPieChart,

Pie,

Tooltip,

Legend,

}

from "recharts";

import type {

ChartSeries

}

from "./types/ChartSeries";

import ChartContainer

from "./ChartContainer";

type Props={

series:ChartSeries[];

};

export default function PieChart({

series,

}:Props){

if(series.length===0){

return null;

}

const data=

series[0].data.map(

item=>({

name:item.label,

value:item.value,

}),

);

return(

<ChartContainer>

<ResponsiveContainer>

<RPieChart>

<Pie

data={data}

dataKey="value"

nameKey="name"

/>

<Tooltip/>

<Legend/>

</RPieChart>

</ResponsiveContainer>

</ChartContainer>

);

}