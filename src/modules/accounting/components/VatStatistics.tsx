import Card

from "../../../components/ui/Card";

import {

useVatTotals

}

from "../hooks/useVatTotals";

export default function VatStatistics(){

const{

outputVat,

inputVat,

vatPayable,

}=

useVatTotals();

return(

<Card>

<div className="space-y-2">

<p>

Output VAT:

₦{outputVat.toLocaleString()}

</p>

<p>

Input VAT:

₦{inputVat.toLocaleString()}

</p>

<p>

VAT Payable:

₦{vatPayable.toLocaleString()}

</p>

</div>

</Card>

);

}