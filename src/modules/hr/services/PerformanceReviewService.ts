import type {

PerformanceReview

}

from "../types/PerformanceReview";

let reviews:PerformanceReview[]=[];

export const performanceReviewService={

async getAll(){

return reviews;

},

async create(

review:PerformanceReview,

){

reviews=[

...reviews,

review,

];

return reviews;

},

async delete(

id:string,

){

reviews=

reviews.filter(

review=>

review.id!==id,

);

return reviews;

},

};