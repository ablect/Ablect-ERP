import Card from "../../../components/ui/Card";

import {

getDashboardAlerts,

} from "../services/AlertEngine";

export default function DashboardAlerts(){

const alerts=

getDashboardAlerts();

return(

<Card>

<h3 className="font-semibold">

Alerts

</h3>

<div className="mt-5 space-y-3">

{

alerts.map(alert=>(

<div

key={alert.id}

className="border rounded-lg p-3"

>

{alert.title}

</div>

))

}

</div>

</Card>

);

}