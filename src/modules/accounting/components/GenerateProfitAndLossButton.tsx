import Button

from "../../../components/ui/Button";

import {

useGenerateProfitAndLoss

}

from "../hooks/useGenerateProfitAndLoss";

export default function GenerateProfitAndLossButton(){

const{

generate,

}=

useGenerateProfitAndLoss();

return(

<Button

onClick={generate}

>

Generate Profit & Loss

</Button>

);

}