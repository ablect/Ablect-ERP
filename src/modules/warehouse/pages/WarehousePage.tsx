import PageContainer

from "../../../components/ui/PageContainer";

import WarehouseHeader

from "../components/WarehouseHeader";

import WarehouseOverview

from "../components/WarehouseOverview";

import CreateWarehouseButton

from "../components/CreateWarehouseButton";

import WarehouseForm

from "../components/WarehouseForm";

import WarehouseSearch

from "../components/WarehouseSearch";

import WarehouseTable

from "../components/WarehouseTable";

import WarehouseCount

from "../components/WarehouseCount";

import {

useLoadWarehouses

}

from "../hooks/useLoadWarehouses";

export default function WarehousePage(){

useLoadWarehouses();

return(

<PageContainer>

<div className="space-y-8">

<WarehouseHeader/>

<WarehouseOverview/>

<CreateWarehouseButton/>

<WarehouseForm/>

<WarehouseSearch/>

<WarehouseTable/>

<WarehouseCount/>

</div>

</PageContainer>

);

}