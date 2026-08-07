import {

useEffect

}

from "react";

import {

performanceReviewService

}

from "../services/PerformanceReviewService";

import {

usePerformanceReviewStore

}

from "../store/PerformanceReviewStore";

export function useLoadPerformanceReviews(){

const{

setReviews,

}=

usePerformanceReviewStore();

useEffect(()=>{

async function load(){

const reviews=

await performanceReviewService.getAll();

setReviews(

reviews,

);

}

load();

},[

setReviews,

]);

}