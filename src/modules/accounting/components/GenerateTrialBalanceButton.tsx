import Button

from "../../../components/ui/Button";

import {

useGenerateTrialBalance

}

from "../hooks/useGenerateTrialBalance";

export default function GenerateTrialBalanceButton(){

const{

generate,

}=

useGenerateTrialBalance();

return(

<Button

onClick={generate}

>

Generate Trial Balance

</Button>

);

}