import {

useExecutiveFilter

}

from "../hooks/useExecutiveFilter";

export default function BranchFilter(){

const{

filter,

updateFilter,

}=

useExecutiveFilter();

return(

<select

value={filter.branchId??""}

onChange={e=>

updateFilter({

branchId:

e.target.value||null,

})

}

>

<option value="">

All Branches

</option>

</select>

);

}