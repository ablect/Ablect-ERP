import type { 
    RecommendationStatus
}
from "./RecommendationStatus";

export interface Recommendation{

id:string;

title:string;

description:string;

priority:
|"low"
|"medium"
|"high"
|"critical";

action:string;

relatedInsightId:string;

status:RecommendationStatus;

createdAt:Date;

resolvedAt?:Date

}