import PageContainer

from "../../../components/ui/PageContainer";

import ProfitAndLossHeader

from "../components/ProfitAndLossHeader";

import ProfitAndLossOverview

from "../components/ProfitAndLossOverview";

import ProfitAndLossToolbar

from "../components/ProfitAndLossToolbar";

import ProfitAndLossSearch

from "../components/ProfitAndLossSearch";

import ProfitAndLossTable

from "../components/ProfitAndLossTable";

import ProfitAndLossCount

from "../components/ProfitAndLossCount";

export default function ProfitAndLossPage(){

return(

<PageContainer>

<div className="space-y-8">

<ProfitAndLossHeader/>

<ProfitAndLossOverview/>

<ProfitAndLossToolbar/>

<ProfitAndLossSearch/>

<ProfitAndLossTable/>

<ProfitAndLossCount/>

</div>

</PageContainer>

);

}