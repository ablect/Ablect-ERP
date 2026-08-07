import {

useEffect

}

from "react";

import {

recommendationRepository

}

from "../services/RecommendationPersistenceService";

import {

useRecommendationStore

}

from "../store/RecommendationStore";

export function useLoadRecommendations(){

const{

setRecommendations,

}=

useRecommendationStore();

useEffect(()=>{

recommendationRepository

.getAll()

.then(

setRecommendations,

);

},[

setRecommendations,

]);

}