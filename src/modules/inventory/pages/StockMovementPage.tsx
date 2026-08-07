import PageContainer

from "../../../components/ui/PageContainer";

import StockMovementHeader

from "../components/StockMovementHeader";

import StockMovementOverview

from "../components/StockMovementOverview";

import CreateStockMovementButton

from "../components/CreateStockMovementButton";

import StockMovementForm

from "../components/StockMovementForm";

import StockMovementSearch

from "../components/StockMovementSearch";

import StockMovementTable

from "../components/StockMovementTable";

import StockMovementCount

from "../components/StockMovementCount";

import {

useLoadStockMovements

}

from "../hooks/useLoadStockMovements";

export default function StockMovementPage(){

useLoadStockMovements();

return(

<PageContainer>

<div className="space-y-8">

<StockMovementHeader/>

<StockMovementOverview/>

<CreateStockMovementButton/>

<StockMovementForm/>

<StockMovementSearch/>

<StockMovementTable/>

<StockMovementCount/>

</div>

</PageContainer>

);

}