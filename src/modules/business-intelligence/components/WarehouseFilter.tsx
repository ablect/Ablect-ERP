import {

useExecutiveFilter

}

from "../hooks/useExecutiveFilter";

export default function WarehouseFilter(){

const{

filter,

updateFilter,

}=

useExecutiveFilter();

return(

<select

value={filter.warehouseId??""}

onChange={e=>

updateFilter({

warehouseId:

e.target.value||null,

})

}

>

<option value="">

All Warehouses

</option>

</select>

);

}