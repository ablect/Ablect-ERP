import { create }

from "zustand";

import type {

MaintenanceRecord

}

from "../types/MaintenanceRecord";

type MaintenanceState={

records:MaintenanceRecord[];

setRecords:(

records:MaintenanceRecord[],

)=>void;

};

export const useMaintenanceStore=

create<MaintenanceState>((set)=>({

records:[],

setRecords(

records,

){

set({

records,

});

},

}));