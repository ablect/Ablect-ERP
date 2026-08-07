import {

useCustomerInvoices

}

from "../hooks/useCustomerInvoices";

export default function CustomerInvoiceCount(){

const{

invoices,

}=

useCustomerInvoices();

return(

<p>

Total Customer Invoices:

{" "}

{invoices.length}

</p>

);

}