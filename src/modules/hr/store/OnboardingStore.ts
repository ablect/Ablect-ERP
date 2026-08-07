import { create }

from "zustand";

import type {

Onboarding

}

from "../types/Onboarding";

type OnboardingState={

records:Onboarding[];

setRecords:(

records:Onboarding[],

)=>void;

};

export const useOnboardingStore=

create<OnboardingState>((set)=>({

records:[],

setRecords(

records,

){

set({

records,

});

},

}));