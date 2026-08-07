import {

useAccounts

}

from "../hooks/useAccounts";

import {

useDeleteAccount

}

from "../hooks/useDeleteAccount";

import AccountActions

from "./AccountActions";

import AccountEmptyState

from "./AccountEmptyState";

export default function AccountTable(){

const{

accounts,

}=

useAccounts();

const{

remove,

}=

useDeleteAccount();

if(accounts.length===0){

return<AccountEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">Code</th>

<th className="p-3">Name</th>

<th className="p-3">Type</th>

<th className="p-3">Status</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{accounts.map(account=>(

<tr

key={account.id}

className="border-t"

>

<td className="p-3">

{account.code}

</td>

<td className="p-3">

{account.name}

</td>

<td className="p-3">

{account.type}

</td>

<td className="p-3">

{account.active

?"Active"

:"Inactive"}

</td>

<td className="p-3">

<AccountActions

onEdit={()=>{}}

onDelete={()=>remove(account.id)}

/>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}