import AIRecommendationCard from "./AIRecommendationCard";

export default function AIRecommendationsPanel(){

return(

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

<AIRecommendationCard

title="Increase Sales"

message="Offer promotional discounts this week."

/>

<AIRecommendationCard

title="Inventory"

message="Reorder your top-selling products."

/>

</div>

);

}