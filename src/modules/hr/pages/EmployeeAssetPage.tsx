import PageContainer

from "../../../components/ui/PageContainer";

import EmployeeAssetHeader

from "../components/EmployeeAssetHeader";

import EmployeeAssetOverview

from "../components/EmployeeAssetOverview";

import CreateEmployeeAssetButton

from "../components/CreateEmployeeAssetButton";

import EmployeeAssetForm

from "../components/EmployeeAssetForm";

import EmployeeAssetSearch

from "../components/EmployeeAssetSearch";

import EmployeeAssetTable

from "../components/EmployeeAssetTable";

import EmployeeAssetCount

from "../components/EmployeeAssetCount";

import {

useLoadEmployeeAssets

}

from "../hooks/useLoadEmployeeAssets";

export default function EmployeeAssetPage(){

useLoadEmployeeAssets();

return(

<PageContainer>

<div className="space-y-8">

<EmployeeAssetHeader/>

<EmployeeAssetOverview/>

<CreateEmployeeAssetButton/>

<EmployeeAssetForm/>

<EmployeeAssetSearch/>

<EmployeeAssetTable/>

<EmployeeAssetCount/>

</div>

</PageContainer>

);

}