import PageContainer

from "../../../components/ui/PageContainer";

import VatHeader

from "../components/VatHeader";

import VatOverview

from "../components/VatOverview";

import VatToolbar

from "../components/VatToolbar";

import VatSearch

from "../components/VatSearch";

import VatTable

from "../components/VatTable";

import VatCount

from "../components/VatCount";

export default function VatPage(){

return(

<PageContainer>

<div className="space-y-8">

<VatHeader/>

<VatOverview/>

<VatToolbar/>

<VatSearch/>

<VatTable/>

<VatCount/>

</div>

</PageContainer>

);

}