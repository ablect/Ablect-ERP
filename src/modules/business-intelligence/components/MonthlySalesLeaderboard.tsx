import Card from "../../../components/ui/Card";

const sales=[

["Lagos",6200000],

["Ibadan",5400000],

["Abuja",4900000],

["Benin",4300000],

];

export default function MonthlySalesLeaderboard(){

return(

<Card>

<h3 className="text-lg font-semibold">

Monthly Sales Leaderboard

</h3>

<div className="mt-5 space-y-4">

{

sales.map(([branch,value])=>(

<div

key={branch}

className="flex justify-between"

>

<span>{branch}</span>

<strong>

₦{Number(value).toLocaleString()}

</strong>

</div>

))

}

</div>

</Card>

);

}