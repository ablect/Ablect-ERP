import { create }

from "zustand";

import type {

Applicant

}

from "../types/Applicant";

type ApplicantState={

applicants:Applicant[];

setApplicants:(

applicants:Applicant[],

)=>void;

};

export const useApplicantStore=

create<ApplicantState>((set)=>({

applicants:[],

setApplicants(

applicants,

){

set({

applicants,

});

},

}));