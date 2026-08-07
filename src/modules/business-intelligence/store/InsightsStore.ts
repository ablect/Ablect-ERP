import { create }

from "zustand";

import type {

Insight

}

from "../types/Insight";

type InsightsState={

insights:Insight[];

setInsights:(

items:Insight[],

)=>void;

};

export const useInsightsStore=

create<InsightsState>((set)=>({

insights:[],

setInsights(items){

set({

insights:items,

});

},

}));