import PageContainer

from "../../../components/ui/PageContainer";

import DepartmentHeader

from "../components/DepartmentHeader";

import DepartmentOverview

from "../components/DepartmentOverview";

import CreateDepartmentButton

from "../components/CreateDepartmentButton";

import DepartmentForm

from "../components/DepartmentForm";

import DepartmentSearch

from "../components/DepartmentSearch";

import DepartmentTable

from "../components/DepartmentTable";

import DepartmentCount

from "../components/DepartmentCount";

import {

useLoadDepartments

}

from "../hooks/useLoadDepartments";

export default function DepartmentPage(){

useLoadDepartments();

return(

<PageContainer>

<div className="space-y-8">

<DepartmentHeader/>

<DepartmentOverview/>

<CreateDepartmentButton/>

<DepartmentForm/>

<DepartmentSearch/>

<DepartmentTable/>

<DepartmentCount/>

</div>

</PageContainer>

);

}