import AIAdvisorBanner from "./AIAdvisorBanner";

import BusinessInsightsPanel from "./BusinessInsightsPanel";

import AIRecommendationsPanel from "./AIRecommendationsPanel";

export default function AIOverviewDashboard(){

return(

<div className="space-y-8">

<AIAdvisorBanner/>

<BusinessInsightsPanel/>

<AIRecommendationsPanel/>

</div>

);

}