import TrialBalanceStatistics

from "./TrialBalanceStatistics";

import TrialBalanceIndicator

from "./TrialBalanceIndicator";

export default function TrialBalanceOverview(){

return(

<div className="space-y-4">

<TrialBalanceStatistics/>

<TrialBalanceIndicator/>

</div>

);

}