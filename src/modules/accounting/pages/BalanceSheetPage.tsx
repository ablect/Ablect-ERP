import PageContainer

from "../../../components/ui/PageContainer";

import BalanceSheetHeader

from "../components/BalanceSheetHeader";

import BalanceSheetOverview

from "../components/BalanceSheetOverview";

import BalanceSheetToolbar

from "../components/BalanceSheetToolbar";

import BalanceSheetSearch

from "../components/BalanceSheetSearch";

import BalanceSheetTable

from "../components/BalanceSheetTable";

import BalanceSheetCount

from "../components/BalanceSheetCount";

export default function BalanceSheetPage(){

return(

<PageContainer>

<div className="space-y-8">

<BalanceSheetHeader/>

<BalanceSheetOverview/>

<BalanceSheetToolbar/>

<BalanceSheetSearch/>

<BalanceSheetTable/>

<BalanceSheetCount/>

</div>

</PageContainer>

);

}