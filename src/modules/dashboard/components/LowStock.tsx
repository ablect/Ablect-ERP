import Card from "../../../components/ui/Card";

const items=[

"Solar Panel 550W",

"5kVA Hybrid Inverter",

"RJ45 Connectors",

"CCTV Camera",

"12V Gel Battery"

];

export default function LowStock(){

return(

<Card>

<h2 className="text-xl font-semibold mb-5">

Low Stock

</h2>

<div className="space-y-3">

{items.map(item=>(

<div

key={item}

className="flex justify-between"

>

<span>{item}</span>

<span className="text-red-600">

Low

</span>

</div>

))}

</div>

</Card>

);

}