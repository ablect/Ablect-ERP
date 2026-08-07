import PageContainer

from "../../../components/ui/PageContainer";

import AuditDashboard

from "../components/AuditDashboard";

export default function AuditLogPage(){

return(

<PageContainer>

<div className="space-y-8">

<AuditDashboard/>

</div>

</PageContainer>

);

}