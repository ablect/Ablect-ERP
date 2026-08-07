import { useCustomerList }

from "../hooks/useCustomerList";

import CustomerAvatar

from "./CustomerAvatar";
import EmptyCustomers

from "./EmptyCustomers";

import CustomerActions

from "./CustomerActions";

export default function CustomerTable(){

const{

customers,

}=useCustomerList();

if(customers.length===0){

return<EmptyCustomers/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3 text-left">

Name

</th>

<th className="p-3 text-left">

Email

</th>

<th className="p-3 text-left">

Phone

</th>

<th className="p-3 text-left">

Actions

</th>

</tr>

</thead>

<tbody>

{customers.map(customer=>(

<tr

key={customer.id}

className="border-t"

>

<td className="p-3">

<div className="flex items-center gap-3">

<CustomerAvatar

name={customer.name}

/>

<span>

{customer.name}

</span>

</div>


</td>

<td className="p-3">

{customer.email}

</td>

<td className="p-3">

{customer.phone}

</td>

<td className="p-3">

<CustomerActions

customerId={customer.id}

onEdit={()=>{}}

onDelete={()=>{}}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}