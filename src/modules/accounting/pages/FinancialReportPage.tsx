import PageContainer

from "../../../components/ui/PageContainer";

import FinancialHeader

from "../components/FinancialHeader";

import ReportFilter

from "../components/ReportFilter";
import FinancialDashboard

from "../components/FinancialDashboard";

export default function FinancialReportPage(){

return(

<PageContainer>

<div className="space-y-8">

<FinancialHeader/>
<ReportFilter/>

<FinancialDashboard/>

</div>

</PageContainer>

);

}