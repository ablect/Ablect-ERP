import PageContainer

from "../../../components/ui/PageContainer";

import PurchaseHeader

from "../components/PurchaseHeader";

import PurchaseOverview

from "../components/PurchaseOverview";

import CreatePurchaseButton

from "../components/CreatePurchaseButton";

import PurchaseForm

from "../components/PurchaseForm";

import PurchaseSearch

from "../components/PurchaseSearch";

import PurchaseTable

from "../components/PurchaseTable";

import PurchaseCount

from "../components/PurchaseCount";

import {

useLoadPurchaseOrders

}

from "../hooks/useLoadPurchaseOrders";

export default function PurchasePage(){

useLoadPurchaseOrders();

return(

<PageContainer>

<div className="space-y-8">

<PurchaseHeader/>

<PurchaseOverview/>

<CreatePurchaseButton/>

<PurchaseForm/>

<PurchaseSearch/>

<PurchaseTable/>

<PurchaseCount/>

</div>

</PageContainer>

);

}