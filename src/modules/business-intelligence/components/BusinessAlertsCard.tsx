import Card from "../../../components/ui/Card";

const alerts=[

"Inventory below reorder level.",

"VAT filing due in 4 days.",

"Customer payment overdue.",

];

export default function BusinessAlertsCard(){

return(

<Card>

<h3 className="text-lg font-semibold">

Business Alerts

</h3>

<div className="mt-5 space-y-3">

{

alerts.map(alert=>(

<div

key={alert}

className="rounded-lg bg-yellow-50 p-3"

>

{alert}

</div>

))

}

</div>

</Card>

);

}