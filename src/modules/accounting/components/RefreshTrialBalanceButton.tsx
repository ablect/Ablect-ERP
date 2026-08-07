import Button

from "../../../components/ui/Button";

import {

useGenerateTrialBalance

}

from "../hooks/useGenerateTrialBalance";

export default function RefreshTrialBalanceButton(){

const{

generate,

}=

useGenerateTrialBalance();

return(

<Button

onClick={generate}

>

Refresh

</Button>

);

}