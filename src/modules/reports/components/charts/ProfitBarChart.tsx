import {

BarChart,

Bar,

XAxis,

YAxis,

Tooltip,

ResponsiveContainer,

CartesianGrid,

}

from "recharts";

import {

useProfitChart

}

from "../../hooks/useProfitChart";

export default function ProfitBarChart(){

const{

data,

}=

useProfitChart();

return(

<ResponsiveContainer

width="100%"

height={300}

>

<BarChart

data={data}

>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="label"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="value"/>

</BarChart>

</ResponsiveContainer>

);

}