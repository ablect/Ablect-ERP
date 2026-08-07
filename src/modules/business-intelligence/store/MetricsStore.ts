import { create }

from "zustand";

import type {

Metric

}

from "../types/Metric";

type MetricsState={

metrics:Metric[];

setMetrics:(

metrics:Metric[],

)=>void;

};

export const useMetricsStore=

create<MetricsState>((set)=>({

metrics:[],

setMetrics(metrics){

set({

metrics,

});

},

}));