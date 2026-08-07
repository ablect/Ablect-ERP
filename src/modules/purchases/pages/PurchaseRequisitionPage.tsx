import PageContainer

from "../../../components/ui/PageContainer";

import PurchaseRequisitionHeader

from "../components/PurchaseRequisitionHeader";

import PurchaseRequisitionOverview

from "../components/PurchaseRequisitionOverview";

import CreatePurchaseRequisitionButton

from "../components/CreatePurchaseRequisitionButton";

import PurchaseRequisitionForm

from "../components/PurchaseRequisitionForm";

import PurchaseRequisitionSearch

from "../components/PurchaseRequisitionSearch";

import PurchaseRequisitionTable

from "../components/PurchaseRequisitionTable";

import PurchaseRequisitionCount

from "../components/PurchaseRequisitionCount";

import {

useLoadPurchaseRequisitions

}

from "../hooks/useLoadPurchaseRequisitions";

export default function PurchaseRequisitionPage(){

useLoadPurchaseRequisitions();

return(

<PageContainer>

<div className="space-y-8">

<PurchaseRequisitionHeader/>

<PurchaseRequisitionOverview/>

<CreatePurchaseRequisitionButton/>

<PurchaseRequisitionForm/>

<PurchaseRequisitionSearch/>

<PurchaseRequisitionTable/>

<PurchaseRequisitionCount/>

</div>

</PageContainer>

);

}