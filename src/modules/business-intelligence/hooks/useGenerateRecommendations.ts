import {

useEffect

}

from "react";

import {

buildRecommendations

}

from "../services/RecommendationEngine";

import {

useInsights

}

from "./useInsights";

import {

useRecommendationStore

}

from "../store/RecommendationStore";

export function useGenerateRecommendations(){

const{

insights,

}=

useInsights();

const{

setRecommendations,

}=

useRecommendationStore();

useEffect(()=>{

setRecommendations(

buildRecommendations(

insights,

),

);

},[

insights,

setRecommendations,

]);

}