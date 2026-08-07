import {

usePayrolls

}

from "../hooks/usePayrolls";

export default function PayrollCount(){

const{

payrolls,

}=

usePayrolls();

return(

<p>

Total Payroll Records:

{" "}

{payrolls.length}

</p>

);

}