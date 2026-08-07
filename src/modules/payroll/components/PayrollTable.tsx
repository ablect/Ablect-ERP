import {

usePayrolls

}

from "../hooks/usePayrolls";

import PayrollActions

from "./PayrollActions";

import PayrollEmptyState

from "./PayrollEmptyState";

export default function PayrollTable(){

const{

payrolls,

}=

usePayrolls();

if(payrolls.length===0){

return <PayrollEmptyState/>;

}

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">Employee</th>

<th className="p-3">Month</th>

<th className="p-3">Net Salary</th>

<th className="p-3">Status</th>

<th className="p-3">Actions</th>

</tr>

</thead>

<tbody>

{payrolls.map(payroll=>(

<tr

key={payroll.id}

className="border-t"

>

<td className="p-3">

{payroll.employeeId}

</td>

<td className="p-3">

{payroll.month}

</td>

<td className="p-3">

₦{payroll.netSalary.toLocaleString()}

</td>

<td className="p-3">

{payroll.status}

</td>

<td className="p-3">

<PayrollActions

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