import {

useBudgetLines

}

from "../hooks/useBudgetLines";

export default function BudgetTable(){

const{

lines,

}=

useBudgetLines();

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead>

<tr>

<th>Account Code</th>

<th>Account</th>

<th>Budget</th>

<th>Actual</th>

<th>Variance</th>

</tr>

</thead>

<tbody>

{lines.map(line=>(

<tr key={line.id}>

<td>{line.accountCode}</td>

<td>{line.accountName}</td>

<td>

₦{line.budgetAmount.toLocaleString()}

</td>

<td>

₦{line.actualAmount.toLocaleString()}

</td>

<td>

₦{line.variance.toLocaleString()}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}