import PageContainer

from "../../../components/ui/PageContainer";

import DepreciationHeader

from "../components/DepreciationHeader";

import DepreciationOverview

from "../components/DepreciationOverview";

import CreateDepreciationButton

from "../components/CreateDepreciationButton";

import DepreciationForm

from "../components/DepreciationForm";

import DepreciationSearch

from "../components/DepreciationSearch";

import DepreciationTable

from "../components/DepreciationTable";

import DepreciationCount

from "../components/DepreciationCount";

import {

useLoadDepreciationRecords

}

from "../hooks/useLoadDepreciationRecords";

export default function DepreciationPage(){

useLoadDepreciationRecords();

return(

<PageContainer>

<div className="space-y-8">

<DepreciationHeader/>

<DepreciationOverview/>

<CreateDepreciationButton/>

<DepreciationForm/>

<DepreciationSearch/>

<DepreciationTable/>

<DepreciationCount/>

</div>

</PageContainer>

);

}