import Card

from "../../../components/ui/Card";

import {

useInventoryStatistics

}

from "../hooks/useInventoryStatistics";

export default function InventoryStatistics(){

const{

total,

inStock,

lowStock,

outOfStock,

inventoryValue,

}=

useInventoryStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Items:

{total}

</p>

<p>

In Stock:

{inStock}

</p>

<p>

Low Stock:

{lowStock}

</p>

<p>

Out Of Stock:

{outOfStock}

</p>

<p>

Inventory Value:

₦{inventoryValue.toLocaleString()}

</p>

</div>

</Card>

);

}