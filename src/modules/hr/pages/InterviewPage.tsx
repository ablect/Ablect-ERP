import PageContainer

from "../../../components/ui/PageContainer";

import InterviewHeader

from "../components/InterviewHeader";

import InterviewOverview

from "../components/InterviewOverview";

import CreateInterviewButton

from "../components/CreateInterviewButton";

import InterviewForm

from "../components/InterviewForm";

import InterviewSearch

from "../components/InterviewSearch";

import InterviewTable

from "../components/InterviewTable";

import InterviewCount

from "../components/InterviewCount";

import {

useLoadInterviews

}

from "../hooks/useLoadInterviews";

export default function InterviewPage(){

useLoadInterviews();

return(

<PageContainer>

<div className="space-y-8">

<InterviewHeader/>

<InterviewOverview/>

<CreateInterviewButton/>

<InterviewForm/>

<InterviewSearch/>

<InterviewTable/>

<InterviewCount/>

</div>

</PageContainer>

);

}