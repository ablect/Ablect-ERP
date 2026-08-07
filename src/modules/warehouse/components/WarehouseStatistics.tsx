import Card

from "../../../components/ui/Card";

import {

useWarehouseStatistics

}

from "../hooks/useWarehouseStatistics";

export default function WarehouseStatistics(){

const{

total,

active,

inactive,

totalCapacity,

occupiedCapacity,

}=

useWarehouseStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Warehouses:

{total}

</p>

<p>

Active:

{active}

</p>

<p>

Inactive:

{inactive}

</p>

<p>

Capacity:

{totalCapacity}

</p>

<p>

Occupied:

{occupiedCapacity}

</p>

</div>

</Card>

);

}