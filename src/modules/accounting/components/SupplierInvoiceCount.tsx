import {

useSupplierInvoices

}

from "../hooks/useSupplierInvoices";

export default function SupplierInvoiceCount(){

const{

invoices,

}=

useSupplierInvoices();

return(

<p>

Total Supplier Invoices:

{" "}

{invoices.length}

</p>

);

}