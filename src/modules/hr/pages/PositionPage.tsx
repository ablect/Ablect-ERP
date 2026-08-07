import PageContainer

from "../../../components/ui/PageContainer";

import PositionHeader

from "../components/PositionHeader";

import PositionOverview

from "../components/PositionOverview";

import CreatePositionButton

from "../components/CreatePositionButton";

import PositionForm

from "../components/PositionForm";

import PositionSearch

from "../components/PositionSearch";

import PositionTable

from "../components/PositionTable";

import PositionCount

from "../components/PositionCount";

import {

useLoadPositions

}

from "../hooks/useLoadPositions";

export default function PositionPage(){

useLoadPositions();

return(

<PageContainer>

<div className="space-y-8">

<PositionHeader/>

<PositionOverview/>

<CreatePositionButton/>

<PositionForm/>

<PositionSearch/>

<PositionTable/>

<PositionCount/>

</div>

</PageContainer>

);

}