import GenerateTrialBalanceButton

from "./GenerateTrialBalanceButton";

import RefreshTrialBalanceButton

from "./RefreshTrialBalanceButton";

import ExportTrialBalanceButton

from "./ExportTrialBalanceButton";

export default function TrialBalanceToolbar(){

return(

<div className="flex gap-3">

<GenerateTrialBalanceButton/>

<RefreshTrialBalanceButton/>

<ExportTrialBalanceButton/>

</div>

);

}