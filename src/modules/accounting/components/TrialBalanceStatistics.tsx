import Card

from "../../../components/ui/Card";

import {

useTrialBalanceStatistics

}

from "../hooks/useTrialBalanceStatistics";

export default function TrialBalanceStatistics(){

const{

accounts,

}=

useTrialBalanceStatistics();

return(

<Card>

<p>

Accounts:

{accounts}

</p>

</Card>

);

}