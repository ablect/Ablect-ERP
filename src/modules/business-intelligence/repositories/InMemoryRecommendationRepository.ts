import type {

Recommendation

}

from "../types/Recommendation";

import type {

RecommendationRepository

}

from "./RecommendationRepository";

export class InMemoryRecommendationRepository

implements RecommendationRepository{

private data:Recommendation[]=[];

async getAll(){

return this.data;

}

async save(

recommendation:Recommendation,

){

this.data.push(

recommendation,

);

}

async update(

recommendation:Recommendation,

){

this.data=

this.data.map(item=>

item.id===recommendation.id

?recommendation

:item,

);

}

async delete(

id:string,

){

this.data=

this.data.filter(item=>

item.id!==id,

);

}

}