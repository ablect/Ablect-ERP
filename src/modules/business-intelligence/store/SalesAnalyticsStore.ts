import { create }

from "zustand";

import type {

SalesAnalyticsPoint

}

from "../types/SalesAnalyticsPoint";

type SalesAnalyticsState={

data:SalesAnalyticsPoint[];

setData:(

data:SalesAnalyticsPoint[],

)=>void;

};

export const useSalesAnalyticsStore=

create<SalesAnalyticsState>((set)=>({

data:[],

setData(data){

set({

data,

});

},

}));