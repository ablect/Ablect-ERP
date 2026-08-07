import GenerateProfitAndLossButton

from "./GenerateProfitAndLossButton";

import ExportProfitAndLossButton

from "./ExportProfitAndLossButton";

import PrintProfitAndLossButton

from "./PrintProfitAndLossButton";

export default function ProfitAndLossToolbar(){

return(

<div className="flex gap-3">

<GenerateProfitAndLossButton/>

<ExportProfitAndLossButton/>

<PrintProfitAndLossButton/>

</div>

);

}