import BalanceSheetStatistics

from "./BalanceSheetStatistics";

import BalanceSheetIndicator

from "./BalanceSheetIndicator";

export default function BalanceSheetOverview(){

return(

<div className="space-y-4">

<BalanceSheetStatistics/>

<BalanceSheetIndicator/>

</div>

);

}