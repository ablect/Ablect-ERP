import PageContainer
from "../../../components/ui/PageContainer";

import DepreciationHeader
from "../components/DepreciationHeader";

import DepreciationOverview
from "../components/DepreciationOverview";

import DepreciationToolbar
from "../components/DepreciationToolbar";

import DepreciationHistoryTable
from "../components/DepreciationHistoryTable";

export default function DepreciationPage(){

return(

<PageContainer>

<div className="space-y-8">

<DepreciationHeader/>

<DepreciationOverview/>

<DepreciationToolbar/>

<DepreciationHistoryTable/>

</div>

</PageContainer>

);

}