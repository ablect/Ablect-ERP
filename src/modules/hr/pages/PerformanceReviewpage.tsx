import PageContainer

from "../../../components/ui/PageContainer";

import PerformanceHeader

from "../components/PerformanceHeader";

import PerformanceOverview

from "../components/PerformanceOverview";

import CreatePerformanceReviewButton

from "../components/CreatePerformanceReviewButton";

import PerformanceReviewForm

from "../components/PerformanceReviewForm";

import PerformanceSearch

from "../components/PerformanceSearch";

import PerformanceReviewTable

from "../components/PerformanceReviewTable";

import PerformanceCount

from "../components/PerformanceCount";

import {

useLoadPerformanceReviews

}

from "../hooks/useLoadPerformanceReviews";

export default function PerformanceReviewPage(){

useLoadPerformanceReviews();

return(

<PageContainer>

<div className="space-y-8">

<PerformanceHeader/>

<PerformanceOverview/>

<CreatePerformanceReviewButton/>

<PerformanceReviewForm/>

<PerformanceSearch/>

<PerformanceReviewTable/>

<PerformanceCount/>

</div>

</PageContainer>

);

}