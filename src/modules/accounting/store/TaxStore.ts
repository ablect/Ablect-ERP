import { create }

from "zustand";

import type {

TaxRate

}

from "../types/TaxRate";

import type {

TaxCategory

}

from "../types/TaxCategory";

type TaxState={

rates:TaxRate[];

categories:TaxCategory[];

setRates:(

rates:TaxRate[],

)=>void;

setCategories:(

categories:TaxCategory[],

)=>void;

};

export const useTaxStore=

create<TaxState>((set)=>({

rates:[],

categories:[],

setRates(

rates,

){

set({

rates,

});

},

setCategories(

categories,

){

set({

categories,

});

},

}));