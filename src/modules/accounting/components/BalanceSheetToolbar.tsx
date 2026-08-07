import GenerateBalanceSheetButton

from "./GenerateBalanceSheetButton";

import ExportBalanceSheetButton

from "./ExportBalanceSheetButton";

import PrintBalanceSheetButton

from "./PrintBalanceSheetButton";

export default function BalanceSheetToolbar(){

return(

<div className="flex gap-3">

<GenerateBalanceSheetButton/>

<ExportBalanceSheetButton/>

<PrintBalanceSheetButton/>

</div>

);

}