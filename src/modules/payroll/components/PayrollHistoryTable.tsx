import {

usePayrollHistory

}

from "../hooks/usePayrollHistory";

import PayrollStatusBadge

from "./PayrollStatusBadge";

export default function PayrollHistoryTable(){

const{

history,

}=

usePayrollHistory();

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-3">

Employee

</th>

<th className="p-3">

Month

</th>

<th className="p-3">

Net Salary

</th>

<th className="p-3">

Status

</th>

<th className="p-3">

Payment Date

</th>

</tr>

</thead>

<tbody>

{history.map(payroll=>(

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

<PayrollStatusBadge

status={payroll.status}

/>

</td>

<td className="p-3">

{payroll.paymentDate||"-"}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}