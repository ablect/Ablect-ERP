import Card

from "../../../components/ui/Card";

import {

usePayrollStatistics

}

from "../hooks/usePayrollStatistics";

export default function PayrollStatistics(){

const{

employees,

totalPayroll,

}=

usePayrollStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Payroll Records:

{employees}

</p>

<p>

Total Payroll:

₦{totalPayroll.toLocaleString()}

</p>

</div>

</Card>

);

}