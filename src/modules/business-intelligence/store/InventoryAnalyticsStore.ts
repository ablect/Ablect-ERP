import { create }

from "zustand";

import type {

InventoryAnalyticsPoint

}

from "../types/InventoryAnalyticsPoint";

type InventoryAnalyticsState={

data:InventoryAnalyticsPoint[];

setData:(

data:InventoryAnalyticsPoint[],

)=>void;

};

export const useInventoryAnalyticsStore=

create<InventoryAnalyticsState>((set)=>({

data:[],

setData(data){

set({

data,

});

},

}));