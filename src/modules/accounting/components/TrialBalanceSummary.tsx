import TrialBalanceIndicator

from "./TrialBalanceIndicator";

import TrialBalanceValidation

from "./TrialBalanceValidation";

export default function TrialBalanceSummary(){

return(

<div className="space-y-4">

<TrialBalanceIndicator/>

<TrialBalanceValidation/>

</div>

);

}