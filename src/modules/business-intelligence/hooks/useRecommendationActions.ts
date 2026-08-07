import {

useRecommendationStore

}

from "../store/RecommendationStore";

export function useRecommendationActions(){

const{

updateStatus,

}=

useRecommendationStore();

return{

acknowledge(id:string){

updateStatus(

id,

"acknowledged",

);

},

start(id:string){

updateStatus(

id,

"inProgress",

);

},

resolve(id:string){

updateStatus(

id,

"resolved",

);

},

dismiss(id:string){

updateStatus(

id,

"dismissed",

);

},

};

}