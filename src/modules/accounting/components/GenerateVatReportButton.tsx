import Button

from "../../../components/ui/Button";

import {

useGenerateVatReport

}

from "../hooks/useGenerateVatReport";

export default function GenerateVatReportButton(){

const{

generate,

}=

useGenerateVatReport();

return(

<Button

onClick={generate}

>

Generate VAT Report

</Button>

);

}