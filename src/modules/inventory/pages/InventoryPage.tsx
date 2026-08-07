import PageContainer

from "../../../components/ui/PageContainer";

import InventoryHeader

from "../components/InventoryHeader";

import InventoryOverview

from "../components/InventoryOverview";

import CreateInventoryButton

from "../components/CreateInventoryButton";

import InventoryForm

from "../components/InventoryForm";

import InventorySearch

from "../components/InventorySearch";

import InventoryTable

from "../components/InventoryTable";

import InventoryCount

from "../components/InventoryCount";

import {

useLoadInventory

}

from "../hooks/useLoadInventory";

export default function InventoryPage(){

useLoadInventory();

return(

<PageContainer>

<div className="space-y-8">

<InventoryHeader/>

<InventoryOverview/>

<CreateInventoryButton/>

<InventoryForm/>

<InventorySearch/>

<InventoryTable/>

<InventoryCount/>

</div>

</PageContainer>

);

}