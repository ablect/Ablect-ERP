import { create }

from "zustand";

import type {

FiscalYear

}

from "../types/FiscalYear";

type FiscalYearState={

years:FiscalYear[];

setYears:(

years:FiscalYear[],

)=>void;

};

export const useFiscalYearStore=

create<FiscalYearState>((set)=>({

years:[],

setYears(

years,

){

set({

years,

});

},

}));