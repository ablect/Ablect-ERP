import PageContainer

from "../../../components/ui/PageContainer";

import CustomerInvoiceHeader

from "../components/CustomerInvoiceHeader";

import CustomerInvoiceOverview

from "../components/CustomerInvoiceOverview";

import CreateCustomerInvoiceButton

from "../components/CreateCustomerInvoiceButton";

import CustomerInvoiceForm

from "../components/CustomerInvoiceForm";

import CustomerInvoiceSearch

from "../components/CustomerInvoiceSearch";

import CustomerInvoiceTable

from "../components/CustomerInvoiceTable";

import CustomerInvoiceCount

from "../components/CustomerInvoiceCount";

import {

useLoadCustomerInvoices

}

from "../hooks/useLoadCustomerInvoices";

export default function CustomerInvoicePage(){

useLoadCustomerInvoices();

return(

<PageContainer>

<div className="space-y-8">

<CustomerInvoiceHeader/>

<CustomerInvoiceOverview/>

<CreateCustomerInvoiceButton/>

<CustomerInvoiceForm/>

<CustomerInvoiceSearch/>

<CustomerInvoiceTable/>

<CustomerInvoiceCount/>

</div>

</PageContainer>

);

}