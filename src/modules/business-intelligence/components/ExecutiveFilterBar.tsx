import GlobalDateFilter

from "./GlobalDateFilter";

import BranchFilter

from "./BranchFilter";

import WarehouseFilter

from "./WarehouseFilter";

import SalespersonFilter

from "./SalespersonFilter";

export default function ExecutiveFilterBar(){

return(

<div className="flex flex-wrap gap-4">

<GlobalDateFilter/>

<BranchFilter/>

<WarehouseFilter/>

<SalespersonFilter/>

</div>

);

}