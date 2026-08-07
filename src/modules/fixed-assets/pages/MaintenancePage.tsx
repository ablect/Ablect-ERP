import PageContainer

from "../../../components/ui/PageContainer";

import MaintenanceHeader

from "../components/MaintenanceHeader";

import MaintenanceOverview

from "../components/MaintenanceOverview";

import CreateMaintenanceButton

from "../components/CreateMaintenanceButton";

import MaintenanceForm

from "../components/MaintenanceForm";

import MaintenanceSearch

from "../components/MaintenanceSearch";

import MaintenanceTable

from "../components/MaintenanceTable";

import MaintenanceCount

from "../components/MaintenanceCount";

import {

useLoadMaintenanceRecords

}

from "../hooks/useLoadMaintenanceRecords";

export default function MaintenancePage(){

useLoadMaintenanceRecords();

return(

<PageContainer>

<div className="space-y-8">

<MaintenanceHeader/>

<MaintenanceOverview/>

<CreateMaintenanceButton/>

<MaintenanceForm/>

<MaintenanceSearch/>

<MaintenanceTable/>

<MaintenanceCount/>

</div>

</PageContainer>

);

}