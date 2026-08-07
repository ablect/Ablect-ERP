import {

useBalanceSheet

}

from "../hooks/useBalanceSheet";

export default function BalanceSheetCount(){

const{

rows,

}=

useBalanceSheet();

return(

<p>

Accounts:

{" "}

{rows.length}

</p>

);

}