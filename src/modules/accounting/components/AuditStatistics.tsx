import Card

from "../../../components/ui/Card";

import {

useAuditStatistics

}

from "../hooks/useAuditStatistics";

export default function AuditStatistics(){

const{

total,

success,

failed,

}=

useAuditStatistics();

return(

<Card>

<div className="space-y-2">

<p>Total Logs: {total}</p>

<p>Successful: {success}</p>

<p>Failed: {failed}</p>

</div>

</Card>

);

}