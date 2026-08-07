import PageContainer

from "../../../components/ui/PageContainer";

import LeaveHeader

from "../components/LeaveHeader";

import LeaveOverview

from "../components/LeaveOverview";

import CreateLeaveButton

from "../components/CreateLeaveButton";

import LeaveForm

from "../components/LeaveForm";

import LeaveSearch

from "../components/LeaveSearch";

import LeaveTable

from "../components/LeaveTable";

import LeaveCount

from "../components/LeaveCount";

import {

useLoadLeaves

}

from "../hooks/useLoadLeaves";

export default function LeavePage(){

useLoadLeaves();

return(

<PageContainer>

<div className="space-y-8">

<LeaveHeader/>

<LeaveOverview/>

<CreateLeaveButton/>

<LeaveForm/>

<LeaveSearch/>

<LeaveTable/>

<LeaveCount/>

</div>

</PageContainer>

);

}