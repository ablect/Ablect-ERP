import PageContainer

from "../../../components/ui/PageContainer";

import TaxDashboard

from "../components/TaxDashboard";

import GenerateTaxConfigurationButton

from "../components/GenerateTaxConfigurationButton";

export default function TaxConfigurationPage(){

return(

<PageContainer>

<div className="space-y-8">

<TaxDashboard/>

<GenerateTaxConfigurationButton/>

</div>

</PageContainer>

);

}