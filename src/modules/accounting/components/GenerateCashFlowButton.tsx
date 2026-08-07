import Button

from "../../../components/ui/Button";

import {

useGenerateCashFlow

}

from "../hooks/useGenerateCashFlow";

export default function GenerateCashFlowButton(){

const{

generate,

}=

useGenerateCashFlow();

return(

<Button

onClick={generate}

>

Generate Cash Flow

</Button>

);

}