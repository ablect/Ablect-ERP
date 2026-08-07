import {

LineChart,

Line,

ResponsiveContainer,

Tooltip,

XAxis,

YAxis

} from "recharts";

const data=[

{name:"Mon",sales:25},

{name:"Tue",sales:35},

{name:"Wed",sales:18},

{name:"Thu",sales:44},

{name:"Fri",sales:53},

{name:"Sat",sales:48},

{name:"Sun",sales:60}

];

export default function SalesChart(){

return(

<div className="bg-white rounded-2xl p-6 shadow">

<h3 className="font-semibold mb-5">

Weekly Sales

</h3>

<div className="h-72">

<ResponsiveContainer>

<LineChart data={data}>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Line

dataKey="sales"

stroke="#2563eb"

strokeWidth={3}

/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

);

}