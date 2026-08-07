import Card from "../../../components/ui/Card";

const news=[

"Inventory valuation updated.",

"VAT return generated.",

"Sales exceeded weekly target.",

"Database backup completed.",

];

export default function ExecutiveNewsFeed(){

return(

<Card>

<h3 className="text-lg font-semibold">

Business Feed

</h3>

<div className="mt-5 space-y-3">

{

news.map(item=>(

<div

key={item}

className="rounded-lg border p-3"

>

{item}

</div>

))

}

</div>

</Card>

);

}