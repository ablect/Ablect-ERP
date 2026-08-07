import type {

Recommendation

}

from "../types/Recommendation";

export interface RecommendationRepository{

getAll():

Promise<Recommendation[]>;

save(

recommendation:Recommendation,

):Promise<void>;

update(

recommendation:Recommendation,

):Promise<void>;

delete(

id:string,

):Promise<void>;

}