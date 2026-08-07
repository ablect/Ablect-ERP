import {

PieChart,

Pie,

Tooltip,

ResponsiveContainer,

}

from "recharts";

import {

useInventoryChart

}

from "../../hooks/useInventoryChart";

export default function InventoryPieChart(){

const{

data,

}=

useInventoryChart();

return(

<ResponsiveContainer

width="100%"

height={300}

>

<PieChart>

<Pie

data={data}

dataKey="value"

nameKey="label"

/>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

);

}