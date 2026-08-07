import Button

from "../../../components/ui/Button";

import {

useRunReconciliation

}

from "../hooks/useRunReconciliation";

export default function RunReconciliationButton(){

const{

run,

}=

useRunReconciliation();

return(

<Button

onClick={run}

>

Run Bank Reconciliation

</Button>

);

}