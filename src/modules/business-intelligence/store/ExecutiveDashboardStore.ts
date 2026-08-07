import { create }

from "zustand";

import type {

KPI

}

from "../types/KPI";

type ExecutiveDashboardState={

kpis:KPI[];

loading:boolean;

setLoading:(loading:boolean)=>void;

setKPIs:(kpis:KPI[])=>void;

};

export const useExecutiveDashboardStore=

create<ExecutiveDashboardState>((set)=>({

kpis:[],

loading:false,

setLoading(loading){

set({loading});

},

setKPIs(kpis){

set({kpis});

},

}));