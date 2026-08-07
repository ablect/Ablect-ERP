import {

useCustomerStore

}

from "../store/CustomerStore";

export default function CustomerCount(){

const{

customers,

}=

useCustomerStore();

return(

<p className="text-sm text-slate-500">

Total Customers:

{" "}

{customers.length}

</p>

);

}