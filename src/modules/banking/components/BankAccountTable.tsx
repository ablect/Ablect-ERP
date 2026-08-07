import {
useBankAccounts
}
from "../hooks/useBankAccounts";

export default function BankAccountTable(){

const{
accounts,
}=useBankAccounts();

if(accounts.length===0){

return(

<p>

No bank accounts found.

</p>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Bank

</th>

<th className="p-3">

Account Name

</th>

<th className="p-3">

Account Number

</th>

<th className="p-3">

Balance

</th>

</tr>

</thead>

<tbody>

{accounts.map(account=>(

<tr
key={account.id}
className="border-t"
>

<td className="p-3">

{account.bankName}

</td>

<td className="p-3">

{account.accountName}

</td>

<td className="p-3">

{account.accountNumber}

</td>

<td className="p-3">

₦{account.balance.toLocaleString()}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}