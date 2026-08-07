import PageContainer

from "../../../components/ui/PageContainer";

import ApplicantHeader

from "../components/ApplicantHeader";

import ApplicantOverview

from "../components/ApplicantOverview";

import CreateApplicantButton

from "../components/CreateApplicantButton";

import ApplicantForm

from "../components/ApplicantForm";

import ApplicantSearch

from "../components/ApplicantSearch";

import ApplicantTable

from "../components/ApplicantTable";

import ApplicantCount

from "../components/ApplicantCount";

import {

useLoadApplicants

}

from "../hooks/useLoadApplicants";

export default function ApplicantPage(){

useLoadApplicants();

return(

<PageContainer>

<div className="space-y-8">

<ApplicantHeader/>

<ApplicantOverview/>

<CreateApplicantButton/>

<ApplicantForm/>

<ApplicantSearch/>

<ApplicantTable/>

<ApplicantCount/>

</div>

</PageContainer>

);

}