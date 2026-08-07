import { create }

from "zustand";

import type {

ExecutiveFilter

}

from "../types/ExecutiveFilter";

type ExecutiveFilterState={

filter:ExecutiveFilter;

setFilter:(

filter:ExecutiveFilter,

)=>void;

updateFilter:(

data:Partial<ExecutiveFilter>

)=>void;

};

export const useExecutiveFilterStore=

create<ExecutiveFilterState>((set)=>({

filter:{

dateFrom:"",

dateTo:"",

branchId:null,

warehouseId:null,

salespersonId:null,

},

setFilter(filter){

set({filter});

},

updateFilter(data){

set(state=>({

filter:{

...state.filter,

...data,

},

}));

},

}));