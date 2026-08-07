import {

usePerformanceReviews

}

from "./usePerformanceReviews";

export function usePerformanceStatistics(){

const{

reviews,

}=

usePerformanceReviews();

const averageScore=

reviews.length===0

?0

:reviews.reduce(

(sum,review)=>

sum+review.score,

0,

)/reviews.length;

return{

total:

reviews.length,

averageScore,

};

}