import {

useExecutiveFilter

}

from "../hooks/useExecutiveFilter";

export default function SalespersonFilter(){

const{

filter,

updateFilter,

}=

useExecutiveFilter();

return(

<select

value={filter.salespersonId??""}

onChange={e=>

updateFilter({

salespersonId:

e.target.value||null,

})

}

>

<option value="">

All Salespeople

</option>

</select>

);

}