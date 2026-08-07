import { create }

from "zustand";

import type {

Payroll

}

from "../types/Payroll";

type PayrollState={

payrolls:Payroll[];

setPayrolls:(

payrolls:Payroll[],

)=>void;

};

export const usePayrollStore=

create<PayrollState>((set)=>({

payrolls:[],

setPayrolls(

payrolls,

){

set({

payrolls,

});

},

}));