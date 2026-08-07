import {

useVatTotals

}

from "../hooks/useVatTotals";

export default function VatIndicator(){

const{

vatPayable,

}=

useVatTotals();

return(

<p>

{

vatPayable>0

?

"VAT Payable"

:

"No VAT Liability"

}

</p>

);

}