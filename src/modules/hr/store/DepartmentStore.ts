import { create }

from "zustand";

import type {

Department

}

from "../types/Department";

type DepartmentState={

departments:Department[];

setDepartments:(

departments:Department[],

)=>void;

};

export const useDepartmentStore=

create<DepartmentState>((set)=>({

departments:[],

setDepartments(

departments,

){

set({

departments,

});

},

}));