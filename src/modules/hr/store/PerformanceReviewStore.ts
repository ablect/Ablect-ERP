import { create }

from "zustand";

import type {

PerformanceReview

}

from "../types/PerformanceReview";

type PerformanceReviewState={

reviews:PerformanceReview[];

setReviews:(

reviews:PerformanceReview[],

)=>void;

};

export const usePerformanceReviewStore=

create<PerformanceReviewState>((set)=>({

reviews:[],

setReviews(

reviews,

){

set({

reviews,

});

},

}));