import { create }

from "zustand";

import type {

Recommendation

}

from "../types/Recommendation";

type RecommendationState={

recommendations:Recommendation[];

setRecommendations:(

items:Recommendation[],

)=>void;

updateStatus:(

id:string,

status:Recommendation["status"],

)=>void;

};

export const useRecommendationStore=

create<RecommendationState>((set)=>({

recommendations:[],

setRecommendations(items){

set({

recommendations:items,

});

},

updateStatus(id,status){

set(state=>({

recommendations:

state.recommendations.map(item=>

item.id===id

?{

...item,

status,

resolvedAt:

status==="resolved"

?new Date()

:item.resolvedAt,

}

:item,

),

}));

},

}));