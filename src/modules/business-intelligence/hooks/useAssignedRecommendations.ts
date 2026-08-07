import {

useRecommendationAssignment

}

from "./useRecommendationAssignment";

export function useAssignedRecommendations(){

const{

assignments,

}=

useRecommendationAssignment();

return assignments;

}