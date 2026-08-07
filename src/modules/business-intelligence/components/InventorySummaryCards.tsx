import Card

from "../../../components/ui/Card";

import {

useInventorySummary

}

from "../hooks/useInventorySummary";

export default function InventorySummaryCards(){

const{

stockValue,

stockIn,

stockOut,

turnover,

}=

useInventorySummary();

return(

<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

<Card>

<p>Inventory Value</p>

<h2>

₦{stockValue.toLocaleString()}

</h2>

</Card>

<Card>

<p>Stock In</p>

<h2>

{stockIn.toLocaleString()}

</h2>

</Card>

<Card>

<p>Stock Out</p>

<h2>

{stockOut.toLocaleString()}

</h2>

</Card>

<Card>

<p>Turnover</p>

<h2>

{turnover.toFixed(2)}

</h2>

</Card>

</div>

);

}