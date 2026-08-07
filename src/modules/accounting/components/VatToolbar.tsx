import GenerateVatReportButton

from "./GenerateVatReportButton";

import ExportVatButton

from "./ExportVatButton";

import PrintVatButton

from "./PrintVatButton";

export default function VatToolbar(){

return(

<div className="flex gap-3">

<GenerateVatReportButton/>

<ExportVatButton/>

<PrintVatButton/>

</div>

);

}