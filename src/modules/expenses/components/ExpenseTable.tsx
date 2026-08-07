import {

useExpenses

}

from "../hooks/useExpenses";

export default function ExpenseTable(){

const{

expenses,

}=

useExpenses();

if(expenses.length===0){

return(

<p>

No expenses found.

</p>

);

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Title

</th>

<th className="p-3">

Category

</th>

<th className="p-3">

Vendor

</th>

<th className="p-3">

Amount

</th>

</tr>

</thead>

<tbody>

{expenses.map(expense=>(

<tr

key={expense.id}

className="border-t"

>

<td className="p-3">

{expense.title}

</td>

<td className="p-3">

{expense.category}

</td>

<td className="p-3">

{expense.vendor}

</td>

<td className="p-3">

₦

{expense.amount.toLocaleString()}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}