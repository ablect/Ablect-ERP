import {

useTrialBalance

}

from "../hooks/useTrialBalance";

export default function TrialBalanceCount(){

const{

rows,

}=

useTrialBalance();

return(

<p>

Accounts:

{" "}

{rows.length}

</p>

);

}