import PageContainer

from "../../../components/ui/PageContainer";

import CashFlowHeader

from "../components/CashFlowHeader";

import CashFlowOverview

from "../components/CashFlowOverview";

import CashFlowToolbar

from "../components/CashFlowToolbar";

import CashFlowSearch

from "../components/CashFlowSearch";

import CashFlowTable

from "../components/CashFlowTable";

import CashFlowCount

from "../components/CashFlowCount";

export default function CashFlowPage(){

return(

<PageContainer>

<div className="space-y-8">

<CashFlowHeader/>

<CashFlowOverview/>

<CashFlowToolbar/>

<CashFlowSearch/>

<CashFlowTable/>

<CashFlowCount/>

</div>

</PageContainer>

);

}