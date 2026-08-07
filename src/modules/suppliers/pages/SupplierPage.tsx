import PageContainer

from "../../../components/ui/PageContainer";

import SupplierHeader

from "../components/SupplierHeader";

import SupplierStatistics

from "../components/SupplierStatistics";

import CreateSupplierButton

from "../components/CreateSupplierButton";

import SupplierForm

from "../components/SupplierForm";

import SupplierSearch

from "../components/SupplierSearch";

import SupplierTable

from "../components/SupplierTable";

import SupplierCount

from "../components/SupplierCount";

import {

useLoadSuppliers

}

from "../hooks/useLoadSuppliers";

export default function SupplierPage(){

useLoadSuppliers();

return(

<PageContainer>

<div className="space-y-8">

<SupplierHeader

title="Suppliers"

description="Manage supplier records."

/>

<SupplierStatistics/>

<CreateSupplierButton/>

<SupplierForm/>

<SupplierSearch/>

<SupplierTable/>

<SupplierCount/>

</div>

</PageContainer>

);

}