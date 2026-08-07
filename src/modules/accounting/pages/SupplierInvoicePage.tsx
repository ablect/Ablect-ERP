import PageContainer

from "../../../components/ui/PageContainer";

import SupplierInvoiceHeader

from "../components/SupplierInvoiceHeader";

import SupplierInvoiceOverview

from "../components/SupplierInvoiceOverview";

import CreateSupplierInvoiceButton

from "../components/CreateSupplierInvoiceButton";

import SupplierInvoiceForm

from "../components/SupplierInvoiceForm";

import SupplierInvoiceSearch

from "../components/SupplierInvoiceSearch";

import SupplierInvoiceTable

from "../components/SupplierInvoiceTable";

import SupplierInvoiceCount

from "../components/SupplierInvoiceCount";

import {

useLoadSupplierInvoices

}

from "../hooks/useLoadSupplierInvoices";

export default function SupplierInvoicePage(){

useLoadSupplierInvoices();

return(

<PageContainer>

<div className="space-y-8">

<SupplierInvoiceHeader/>

<SupplierInvoiceOverview/>

<CreateSupplierInvoiceButton/>

<SupplierInvoiceForm/>

<SupplierInvoiceSearch/>

<SupplierInvoiceTable/>

<SupplierInvoiceCount/>

</div>

</PageContainer>

);

}