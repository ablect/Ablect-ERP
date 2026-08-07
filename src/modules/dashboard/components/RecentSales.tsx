import Card from "../../../components/ui/Card";

const sales = [

{ customer:"John", amount:"₦125,000" },

{ customer:"Mary", amount:"₦84,000" },

{ customer:"Ade", amount:"₦42,500" },

{ customer:"Blessing", amount:"₦210,000" }

];

export default function RecentSales(){

return(

<Card>

<h2 className="text-xl font-semibold mb-5">

Recent Sales

</h2>

<div className="space-y-4">

{sales.map((sale,index)=>(

<div

key={index}

className="flex justify-between border-b pb-3"

>

<span>{sale.customer}</span>

<strong>{sale.amount}</strong>

</div>

))}

</div>

</Card>

);

}