import PageContainer

from "../../../components/ui/PageContainer";

import CurrencyStatistics

from "../components/CurrencyStatistics";

export default function CurrencyManagementPage(){

return(

<PageContainer>

<div className="space-y-8">

<CurrencyStatistics/>

</div>

</PageContainer>

);

}