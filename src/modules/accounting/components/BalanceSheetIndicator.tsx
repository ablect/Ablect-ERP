import {

useBalanceSheetValidation

}

from "../hooks/useBalanceSheetValidation";

export default function BalanceSheetIndicator(){

const{

balanced,

difference,

}=

useBalanceSheetValidation();

return(

<div>

<p>

{

balanced

?

"Balance Sheet Balanced"

:

"Balance Sheet Out of Balance"

}

</p>

<p>

Difference:

₦{difference.toLocaleString()}

</p>

</div>

);

}