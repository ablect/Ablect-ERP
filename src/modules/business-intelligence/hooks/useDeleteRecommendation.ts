import {

recommendationRepository

}

from "../services/RecommendationPersistenceService";

export async function deleteRecommendation(

id:string,

){

await recommendationRepository.delete(

id,

);

}