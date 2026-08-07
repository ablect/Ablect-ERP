import {

ResponsiveContainer,

BarChart as RBarChart,

Bar,

XAxis,

YAxis,

CartesianGrid,

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

export default function BarChart({

series,

}:Props){

if(series.length===0){

return null;

}

const data=

series[0].data.map(

item=>({

label:item.label,

value:item.value,

}),

);

return(

<ChartContainer>

<ResponsiveContainer>

<RBarChart data={data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="label"/>

<YAxis/>

<Tooltip/>

<Legend/>

<Bar

dataKey="value"

/>

</RBarChart>

</ResponsiveContainer>

</ChartContainer>

);

}