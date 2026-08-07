import {

useActiveAccountingPeriod

}

from "../hooks/useActiveAccountingPeriod";

export default function AccountingPeriodStatus(){

const period=

useActiveAccountingPeriod();

return(

<p>

Current Period:

{" "}

{

period?.name??

"No Active Period"

}

</p>

);

}