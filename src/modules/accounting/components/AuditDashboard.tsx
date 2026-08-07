import AuditStatistics

from "./AuditStatistics";

import AuditLogTable

from "./AuditLogTable";

export default function AuditDashboard(){

return(

<div className="space-y-6">

<AuditStatistics/>

<AuditLogTable/>

</div>

);

}