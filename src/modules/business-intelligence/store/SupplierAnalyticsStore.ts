import { create }

from "zustand";

import type {

SupplierAnalyticsPoint

}

from "../types/SupplierAnalyticsPoint";

type SupplierAnalyticsState={

data:SupplierAnalyticsPoint[];

setData:(

data:SupplierAnalyticsPoint[],

)=>void;

};

export const useSupplierAnalyticsStore=

create<SupplierAnalyticsState>((set)=>({

data:[],

setData(data){

set({

data,

});

},

}));