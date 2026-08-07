import Card from "../../../components/ui/Card";

export default function InventoryHealthCard(){

return(

<Card>

<h2 className="font-semibold">

Inventory Health

</h2>

<div className="mt-5">

<div className="mb-3">

Healthy Stock

</div>

<div className="h-3 rounded-full bg-slate-200">

<div

className="h-3 rounded-full bg-green-500"

style={{width:"82%"}}

/>

</div>

</div>

</Card>

);

}