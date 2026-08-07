import PageContainer

from "../../../components/ui/PageContainer";

import AttendanceHeader

from "../components/AttendanceHeader";

import AttendanceOverview

from "../components/AttendanceOverview";

import CreateAttendanceButton

from "../components/CreateAttendanceButton";

import AttendanceForm

from "../components/AttendanceForm";

import AttendanceSearch

from "../components/AttendanceSearch";

import AttendanceTable

from "../components/AttendanceTable";

import AttendanceCount

from "../components/AttendanceCount";

import {

useLoadAttendances

}

from "../hooks/useLoadAttendances";

export default function AttendancePage(){

useLoadAttendances();

return(

<PageContainer>

<div className="space-y-8">

<AttendanceHeader/>

<AttendanceOverview/>

<CreateAttendanceButton/>

<AttendanceForm/>

<AttendanceSearch/>

<AttendanceTable/>

<AttendanceCount/>

</div>

</PageContainer>

);

}