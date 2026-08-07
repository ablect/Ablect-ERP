import Card from "../../../components/ui/Card";

import {

getSystemHealth,

} from "../services/SystemHealthService";

export default function SystemHealthPanel(){

const system=

getSystemHealth();

return(

<Card>

<h3 className="font-semibold">

System Health

</h3>

<div className="mt-5 space-y-2">

<p>

Database: {system.database}

</p>

<p>

Storage: {system.storage}

</p>

<p>

Performance: {system.performance}

</p>

<p>

Status: {system.status}

</p>

</div>

</Card>

);

}