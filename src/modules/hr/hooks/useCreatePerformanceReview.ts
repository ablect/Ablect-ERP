import {

createPerformanceReview

}

from "../utils/createPerformanceReview";

import {

performanceReviewService

}

from "../services/PerformanceReviewService";

import {

usePerformanceReviewStore

}

from "../store/PerformanceReviewStore";

export function useCreatePerformanceReview(){

async function create(

employeeId:string,

reviewPeriod:string,

reviewer:string,

score:number,

comments:string,

){

const review=

createPerformanceReview(

employeeId,

reviewPeriod,

reviewer,

score,

comments,

);

const reviews=

await performanceReviewService.create(

review,

);

usePerformanceReviewStore

.getState()

.setReviews(

reviews,

);

}

return{

create,

};

}