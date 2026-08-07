import Button

from "../../../components/ui/Button";

import {

useGenerateBalanceSheet

}

from "../hooks/useGenerateBalanceSheet";

export default function GenerateBalanceSheetButton(){

const{

generate,

}=

useGenerateBalanceSheet();

return(

<Button

onClick={generate}

>

Generate Balance Sheet

</Button>

);

}