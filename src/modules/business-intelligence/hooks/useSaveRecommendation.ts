import {

recommendationRepository

}

from "../services/RecommendationPersistenceService";

import type {

Recommendation

}

from "../types/Recommendation";

export async function saveRecommendation(

recommendation:Recommendation,

){

await recommendationRepository.save(

recommendation,

);

}