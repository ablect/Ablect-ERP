import PageContainer

from "../../../components/ui/PageContainer";

import EmployeeHeader

from "../components/EmployeeHeader";

import EmployeeStatistics

from "../components/EmployeeStatistics";

import CreateEmployeeButton

from "../components/CreateEmployeeButton";

import EmployeeForm

from "../components/EmployeeForm";

import EmployeeSearch

from "../components/EmployeeSearch";

import EmployeeTable

from "../components/EmployeeTable";

import EmployeeCount

from "../components/EmployeeCount";

import {

useLoadEmployees

}

from "../hooks/useLoadEmployees";

export default function EmployeePage(){

useLoadEmployees();

return(

<PageContainer>

<div className="space-y-8">

<EmployeeHeader/>

<EmployeeStatistics/>

<CreateEmployeeButton/>

<EmployeeForm/>

<EmployeeSearch/>

<EmployeeTable/>

<EmployeeCount/>

</div>

</PageContainer>

);

}