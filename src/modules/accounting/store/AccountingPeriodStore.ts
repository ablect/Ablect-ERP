import { create }

from "zustand";

import type {

AccountingPeriod

}

from "../types/AccountingPeriod";

type AccountingPeriodState={

periods:AccountingPeriod[];

setPeriods:(

periods:AccountingPeriod[],

)=>void;

};

export const useAccountingPeriodStore=

create<AccountingPeriodState>((set)=>({

periods:[],

setPeriods(

periods,

){

set({

periods,

});

},

}));