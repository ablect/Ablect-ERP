import {

recommendationRepository

}

from "../services/RecommendationPersistenceService";

import type {

Recommendation

}

from "../types/Recommendation";

export async function updateRecommendation(

recommendation:Recommendation,

){

await recommendationRepository.update(

recommendation,

);

}