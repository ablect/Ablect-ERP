import { create }

from "zustand";

import type {

KPIItem

}

from "../types/KPIItem";

type KPIRegistryState={

items:KPIItem[];

setItems:(

items:KPIItem[],

)=>void;

};

export const useKPIRegistryStore=

create<KPIRegistryState>((set)=>({

items:[],

setItems(items){

set({

items,

});

},

}));