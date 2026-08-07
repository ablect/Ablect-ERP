import PageContainer

from "../../../components/ui/PageContainer";

import ReconciliationSummary

from "../components/ReconciliationSummary";

import ReconciliationTable

from "../components/ReconciliationTable";

import RunReconciliationButton

from "../components/RunReconciliationButton";

export default function ReconciliationReportPage(){

return(

<PageContainer>

<div className="space-y-8">

<ReconciliationSummary/>

<RunReconciliationButton/>

<ReconciliationTable/>

</div>

</PageContainer>

);

}