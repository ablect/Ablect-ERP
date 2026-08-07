import CreateBudgetButton

from "./CreateBudgetButton";

import EditBudgetButton

from "./EditBudgetButton";

import ApproveBudgetButton

from "./ApproveBudgetButton";

export default function BudgetToolbar(){

return(

<div className="flex gap-3">

<CreateBudgetButton/>

<EditBudgetButton/>

<ApproveBudgetButton/>

</div>

);

}