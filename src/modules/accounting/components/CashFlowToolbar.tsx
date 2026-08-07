import GenerateCashFlowButton

from "./GenerateCashFlowButton";

import ExportCashFlowButton

from "./ExportCashFlowButton";

import PrintCashFlowButton

from "./PrintCashFlowButton";

export default function CashFlowToolbar(){

return(

<div className="flex gap-3">

<GenerateCashFlowButton/>

<ExportCashFlowButton/>

<PrintCashFlowButton/>

</div>

);

}