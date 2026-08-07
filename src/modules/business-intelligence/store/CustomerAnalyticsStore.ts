import { create }

from "zustand";

import type {

CustomerAnalyticsPoint

}

from "../types/CustomerAnalyticsPoint";

type CustomerAnalyticsState={

data:CustomerAnalyticsPoint[];

setData:(

data:CustomerAnalyticsPoint[],

)=>void;

};

export const useCustomerAnalyticsStore=

create<CustomerAnalyticsState>((set)=>({

data:[],

setData(data){

set({

data,

});

},

}));