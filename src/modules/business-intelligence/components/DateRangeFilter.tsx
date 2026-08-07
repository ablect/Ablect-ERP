import {

useExecutiveFilter

}

from "../hooks/useExecutiveFilter";

export default function DateRangeFilter(){

const{

filter,

updateFilter,

}=

useExecutiveFilter();

return(

<div className="flex gap-3">

<input

type="date"

value={filter.dateFrom}

onChange={e=>

updateFilter({

dateFrom:e.target.value,

})

}

/>

<input

type="date"

value={filter.dateTo}

onChange={e=>

updateFilter({

dateTo:e.target.value,

})

}

/>

</div>

);

}