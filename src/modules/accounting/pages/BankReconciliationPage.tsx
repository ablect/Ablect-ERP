import PageContainer

from "../../../components/ui/PageContainer";

import BankReconciliationStatistics

from "../components/BankReconciliationStatistics";

import ReconcileButton

from "../components/ReconcileButton";

export default function BankReconciliationPage(){

return(

<PageContainer>

<div className="space-y-8">

<BankReconciliationStatistics/>

<ReconcileButton/>

</div>

</PageContainer>

);

}