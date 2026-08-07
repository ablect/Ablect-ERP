import {

ResponsiveContainer,

LineChart as RLineChart,

Line,

CartesianGrid,

XAxis,

YAxis,

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

export default function LineChart({

series,

}:Props){

if(series.length===0){

return null;

}

const data=

series[0].data.map(

point=>({

label:point.label,

value:point.value,

}),

);

return(

<ChartContainer>

<ResponsiveContainer>

<RLineChart data={data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="label"/>

<YAxis/>

<Tooltip/>

<Legend/>

<Line

type="monotone"

dataKey="value"

/>

</RLineChart>

</ResponsiveContainer>

</ChartContainer>

);

}