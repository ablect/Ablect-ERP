import {

useRecommendations

}

from "./useRecommendations";

export function useOpenRecommendations(){

const{

recommendations,

}=

useRecommendations();

return recommendations.filter(item=>

item.status!=="resolved"

&&

item.status!=="dismissed",

);

}