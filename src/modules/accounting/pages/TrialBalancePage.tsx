import PageContainer

from "../../../components/ui/PageContainer";

import TrialBalanceHeader

from "../components/TrialBalanceHeader";

import TrialBalanceOverview

from "../components/TrialBalanceOverview";

import TrialBalanceToolbar

from "../components/TrialBalanceToolbar";

import TrialBalanceSearch

from "../components/TrialBalanceSearch";

import TrialBalanceTable

from "../components/TrialBalanceTable";

import TrialBalanceCount

from "../components/TrialBalanceCount";

export default function TrialBalancePage(){

return(

<PageContainer>

<div className="space-y-8">

<TrialBalanceHeader/>

<TrialBalanceOverview/>

<TrialBalanceToolbar/>

<TrialBalanceSearch/>

<TrialBalanceTable/>

<TrialBalanceCount/>

</div>

</PageContainer>

);

}