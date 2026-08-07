import PageContainer from "../../../components/ui/PageContainer";

import SectionTitle from "../../../components/ui/SectionTitle";

import UnitTable from "../components/UnitTable";

export default function UnitPage(){

return(

<PageContainer>

<div className="space-y-8">

<SectionTitle

title="Units"

subtitle="Manage units of measure."

/>

<UnitTable/>

</div>

</PageContainer>

);

}