import {

performanceReviewService

}

from "../services/PerformanceReviewService";

import {

usePerformanceReviewStore

}

from "../store/PerformanceReviewStore";

export function useDeletePerformanceReview(){

async function remove(

id:string,

){

const reviews=

await performanceReviewService.delete(

id,

);

usePerformanceReviewStore

.getState()

.setReviews(

reviews,

);

}

return{

remove,

};

}