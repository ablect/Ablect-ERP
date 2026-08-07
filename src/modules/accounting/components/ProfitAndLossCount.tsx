import {

useProfitAndLoss

}

from "../hooks/useProfitAndLoss";

export default function ProfitAndLossCount(){

const{

rows,

}=

useProfitAndLoss();

return(

<p>

Accounts:

{" "}

{rows.length}

</p>

);

}