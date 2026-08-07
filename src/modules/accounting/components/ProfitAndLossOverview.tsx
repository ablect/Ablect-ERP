import ProfitAndLossStatistics

from "./ProfitAndLossStatistics";

import ProfitAndLossIndicator

from "./ProfitAndLossIndicator";

export default function ProfitAndLossOverview(){

return(

<div className="space-y-4">

<ProfitAndLossStatistics/>

<ProfitAndLossIndicator/>

</div>

);

}