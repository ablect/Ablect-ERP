import {

useReconciliationResultStore

}

from "../store/ReconciliationResultStore";

export default function ReconciliationTable(){

const{

results,

}=

useReconciliationResultStore();

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead>

<tr>

<th>Bank Ref</th>

<th>Ledger Ref</th>

<th>Status</th>

<th>Difference</th>

</tr>

</thead>

<tbody>

{results.map(item=>(

<tr key={item.transactionId}>

<td>{item.bankReference}</td>

<td>{item.ledgerReference}</td>

<td>{item.remarks}</td>

<td>

₦{item.difference.toLocaleString()}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}