import Card from "../../../components/ui/Card";

const items=[

"Milk",

"Sugar",

"Rice",

"Beans",

];

export default function LowStockAlertCard(){

return(

<Card>

<h3 className="text-lg font-semibold">

Low Stock Alerts

</h3>

<div className="mt-5 space-y-3">

{

items.map(item=>(

<div

key={item}

className="rounded-lg bg-red-50 p-3"

>

{item}

</div>

))

}

</div>

</Card>

);

}