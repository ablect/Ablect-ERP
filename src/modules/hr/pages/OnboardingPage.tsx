import PageContainer

from "../../../components/ui/PageContainer";

import OnboardingHeader

from "../components/OnboardingHeader";

import OnboardingOverview

from "../components/OnboardingOverview";

import CreateOnboardingButton

from "../components/CreateOnboardingButton";

import OnboardingForm

from "../components/OnboardingForm";

import OnboardingSearch

from "../components/OnboardingSearch";

import OnboardingTable

from "../components/OnboardingTable";

import OnboardingCount

from "../components/OnboardingCount";

import {

useLoadOnboarding

}

from "../hooks/useLoadOnboarding";

export default function OnboardingPage(){

useLoadOnboarding();

return(

<PageContainer>

<div className="space-y-8">

<OnboardingHeader/>

<OnboardingOverview/>

<CreateOnboardingButton/>

<OnboardingForm/>

<OnboardingSearch/>

<OnboardingTable/>

<OnboardingCount/>

</div>

</PageContainer>

);

}