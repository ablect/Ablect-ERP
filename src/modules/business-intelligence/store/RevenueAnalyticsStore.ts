import { create }

from "zustand";

import type {

RevenuePoint

}

from "../types/RevenuePoint";

type RevenueAnalyticsState={

data:RevenuePoint[];

setData:(

data:RevenuePoint[],

)=>void;

};

export const useRevenueAnalyticsStore=

create<RevenueAnalyticsState>((set)=>({

data:[],

setData(data){

set({

data,

});

},

}));